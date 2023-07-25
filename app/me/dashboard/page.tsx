"use client";
import { useAuth } from "@/libs/providers/auth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="w-full h-full">
      <h1>DashboardPage</h1>
      <div className="container mx-auto">
        <div className="card card-bordered w-96">
          <div className="card-body">
            <h3 className="card-title">Name:{user?.name}</h3>
            <p>Email: {user?.email}</p>
            <p>Verified: {user?.emailVerified?.toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
