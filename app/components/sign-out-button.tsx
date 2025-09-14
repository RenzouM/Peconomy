import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}>
      <button
        type="submit"
        className="bg-gradient-to-r cursor-pointer from-red-600 via-red-500 to-red-700 text-white px-5 py-2 rounded-4xl hover:from-red-700 hover:via-red-600 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
        Sign Out
      </button>
    </form>
  );
}
