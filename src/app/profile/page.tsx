import ProfileClient from "@/component/ProfileClient";
import Protected from "@/component/protected";


export default function ProfilePage() {
  return (
    <Protected>
      <ProfileClient />
    </Protected>
  );
}
