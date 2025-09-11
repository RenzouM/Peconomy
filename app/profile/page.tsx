import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileStateProvider from "../components/profile/ProfileStateProvider";

export default function LinktreeProfile() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center rounded-4xl">
      {/* Screen Container */}
      <div className="w-full h-full flex-1 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex">
        {/* Sidebar - Interactivo */}
        <ProfileSidebar />

        {/* Estado y contenido interactivo - Se hidrata en el cliente */}
        <ProfileStateProvider />
      </div>
    </div>
  );
}
