import { supabase } from "./supabase";

export async function getVruddhas() {
  const { data, error } = await supabase.from("vruddhas").select("*");
  if (error) throw new Error(error.message);

  return data;
}

export async function getVruddha(vId) {
  const { data, error } = await supabase
    .from("vruddhas")
    .select("*")
    .eq("id", vId);
  if (error) {
    console.log(error);
  }

  return data;
}

export async function getVruddhaBookingsDates(vId) {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("bookings")
    .select("date")
    .eq("vId", vId)
    .gte("date", today);

  if (error) throw new Error(error.message);

  console.log("Filtered Booking Dates:", data);
  return data;
}

export async function getAccount(email) {
  const { data, error } = await supabase
    .from("mitra")
    .select("*")
    .eq("emailId", email)
    .single();

  return data;
}

export async function createAccount(newAccount) {
  const { data, error } = await supabase.from("mitra").insert([newAccount]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function getMitra(id) {
  const { data, error } = await supabase.from("mitra").select("*").eq("id", id);

  return data;
}

export async function getBookingsById(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select(`*, vruddhas(image, firstName, lastName)`)
    .eq("mId", id)
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteBooking(id) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function getReviews(mId) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, vId, created_at, mReview, vruddhas(image, firstName, lastName)"
    )
    .eq("mId", mId);

  if (error) throw new Error(error.message);

  return data;
}
