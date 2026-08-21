import { Suspense } from "react";
import { ProfileEditClient } from "./edit-client";

export default function ProfileEditPage() {
  return (
    <Suspense>
      <ProfileEditClient />
    </Suspense>
  );
}
