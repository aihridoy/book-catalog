import { MailOutlined, UserOutlined } from "@ant-design/icons";
import type { IUser } from "../types";

export default function UserDetails({ user }: { user: IUser | null }) {
  return (
    <div className="max-w-4xl mx-auto text-center mb-12">
      <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white border-opacity-50">
        <div className="flex justify-center mb-4">
          <UserOutlined className="text-6xl text-amber-600 animate-pulse" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
          {user?.username?.split(" ")[0] || "User"}
        </h1>
        <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
          <MailOutlined className="text-amber-600" />
          {user?.email || "No email provided"}
        </p>
        <p className="text-gray-500 mt-2">
          Joined:{" "}
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
}
