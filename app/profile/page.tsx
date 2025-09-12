import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileStateProvider from "../components/profile/ProfileStateProvider";

export default function LinktreeProfile() {
  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-3  rounded-4xl">
      {/* Screen Container */}
      <div className="w-full h-full flex bg-white rounded-4xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Sidebar - Interactivo */}
        <ProfileSidebar />

        {/* Estado y contenido interactivo - Se hidrata en el cliente */}
        <div className="hidden sm:block w-full h-full overflow-hidden">
          <ProfileStateProvider />
        </div>
      </div>
    </div>
  );
}
