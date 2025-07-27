import UpdateUserForm from "../../_components/UpdateUserForm";
import { auth } from "../../_lib/auth";
import { getAccount } from "../../_lib/data-service";

async function page() {
  const session = await auth();
  const account = await getAccount(session.user.email);

  return <UpdateUserForm account={account} />;
}

export default page;
