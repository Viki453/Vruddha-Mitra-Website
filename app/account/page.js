import { auth } from "../_lib/auth";

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "User";

  return (
    <section className="space-y-6">
      <h1 className="text-4xl font-bold y">Welcome, {firstName}</h1>

      <div className="bg-base-200 p-6 sm:p-10 rounded-xl shadow-md text-base leading-relaxed">
        <p className="mb-4">
          Every day is a fresh start, a blank page to write your own story.
          It&apos;s not about being perfect; it&apos;s about effort. And when
          you bring that effort every single day, that&apos;s where
          transformation happens. That&apos;s how change begins.
        </p>

        <p className="text-sm text-muted-foreground">
          Let today be the day you push forward with courage, embrace challenges
          with clarity, and take one meaningful step closer to who you want to
          become.
        </p>
      </div>
    </section>
  );
}
