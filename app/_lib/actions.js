"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookingsById } from "./data-service";
import {
  differenceInCalendarDays,
  format,
  formatDistanceToNow,
  getDate,
  getMonth,
  getYear,
  parse,
  parseISO,
  parseJSON,
  toDate,
} from "date-fns";
import diff from "daisyui/components/diff";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/vruddhas" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateAccount(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const emailId = session.user.email;
  const description = formData.get("description");
  const gender = formData.get("gender");
  const DOB = formData.get("DOB");
  const avatar = formData.get("avatar") || "";
  const languages = formData.get("languages");
  const phoneNo = formData.get("phoneNo");

  if (phoneNo.length != 0 && !/^[6-9]\d{9}$/.test(phoneNo))
    throw new Error("Invalid phone number");

  const updateData = {
    firstName,
    lastName,
    emailId,
    description,
    gender,
    DOB,
    avatar: "",
    languages,
    phoneNo,
  };

  console.log({
    firstName,
    lastName,
    emailId,
    description,
    gender,
    DOB,
    avatar,
    languages,
    phoneNo,
  });

  let tempUrl;
  if (avatar && avatar instanceof File && avatar.size > 0) {
    const fileExt = avatar.name.split(".").pop();
    const fileName = `avatar-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const { data: avatarData, error: avatarError } = await supabase.storage
      .from("mitras")
      .upload(filePath, avatar);

    if (avatarError) throw new Error(`Upload failed: ${avatarError.message}`);

    const {
      data: { publicUrl },
    } = supabase.storage.from("mitras").getPublicUrl(avatarData.path);

    updateData.avatar = publicUrl;
    tempUrl = publicUrl;
  }

  const { data, error } = await supabase
    .from("mitra")
    .update(updateData)
    .eq("id", session.user.accountId);

  if (error) throw new Error(error.message);

  revalidatePath("/account/profile");
  console.log("session: ", session.user);

  return data;
}

export async function deleteBooking(id) {
  const session = await auth();

  if (!session)
    throw new Error("You must be logged in to delete a reservation");

  const accountBookings = getBookingsById(session.user.accountId);

  const accountBookingsIds = (await accountBookings).map(
    (booking) => booking.id
  );

  if (!accountBookingsIds.includes(id)) throw new Error("Not authorized");

  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/account/reservations");
}

export async function isVruddhaBooked(id, date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("date", date.toISOString().split("T")[0]);

  if (error) throw new Error(error.message);

  if (!data || data.length === 0) return false;

  return data.some((entry) => entry.vId !== id);
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session) {
    return { success: false, message: "You must be logged in to book." };
  }

  const newBooking = {
    ...bookingData,
    activity: formData.get("activity")?.slice(0, 1000),
  };

  const checkDate = format(newBooking.date, "yyyy-MM-dd");
  newBooking.date = checkDate;

  const { data: existingBooking } = await supabase
    .from("bookings")
    .select("*")
    .eq("date", checkDate)
    .eq("vId", newBooking.vId)
    .single();

  if (existingBooking) {
    return {
      success: false,
      message: "This date is already booked for this vruddha.",
    };
  }

  const { data: conflictingBooking } = await supabase
    .from("bookings")
    .select("vId")
    .eq("date", checkDate)
    .eq("mId", newBooking.mId)
    .neq("vId", newBooking.vId)
    .single();

  if (conflictingBooking) {
    return {
      success: false,
      message: "You cannot book a different vruddha on the same date.",
    };
  }

  const { data: recentBookings, error: recentError } = await supabase
    .from("bookings")
    .select("date")
    .eq("mId", newBooking.mId);

  if (recentError) {
    return { success: false, message: recentError.message };
  }

  const newDate = parseISO(checkDate);
  const isTooClose = recentBookings?.some((b) => {
    const days = differenceInCalendarDays(newDate, parseISO(b.date));
    return Math.abs(days) <= 7;
  });

  if (isTooClose) {
    return {
      success: false,
      message:
        "You cannot book within 7 days before or after another reservation.",
    };
  }

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath(`/vruddhas/${bookingData.vId}`);
  redirect("/vruddhas/thankyou");

  return { success: true };
}

export async function setReview(bookingId, review) {
  const { error } = await supabase
    .from("bookings")
    .update({ mReview: review })
    .eq("id", bookingId);

  console.log(review);

  if (error) throw new Error(error.message);
  revalidatePath("account/reservations");
}
