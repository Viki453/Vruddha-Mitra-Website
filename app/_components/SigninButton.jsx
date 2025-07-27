import { signInAction } from "../_lib/actions";

function SigninButton() {
  return (
    <div className="flex justify-center content-center gap-2 items-center border border-accent bg-base-200 p-2 rounded-sm">
      <form action={signInAction}>
        <button className="btn">
          <img
            src="https://authjs.dev/img/providers/google.svg"
            className="w-7"
          />
          Sign in with Google
        </button>
      </form>
    </div>
  );
}

export default SigninButton;
