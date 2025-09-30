// import { useAuth } from "../../Hooks/useAuth";

// export default function ProfilePanel() {
//   const { user } = useAuth();

//   return (
//     <div className="bg-white shadow-lg rounded-xl p-4">
//       <h2 className="text-xl font-bold mb-3">My Profile</h2>
//       <p><strong>Name:</strong> {user?.name}</p>
//       <p><strong>Email:</strong> {user?.email}</p>
//       <p>
//         <strong>Status:</strong>{" "}
//         {user?.isApproved ? (
//           <span className="text-green-600">Approved</span>
//         ) : (
//           <span className="text-yellow-600">Awaiting approval</span>
//         )}
//       </p>
//     </div>
//   );
// }

import { useAuth } from "../../Context/AuthContext";

export default function ProfilePanel() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="panel">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>
        Status:{" "}
        {user.approvalStatus === "approved" ? (
          <span style={{ color: "green" }}>Approved</span>
        ) : user.approvalStatus === "rejected" ? (
          <span style={{ color: "red" }}>Rejected</span>
        ) : (
          <span style={{ color: "orange" }}>Pending</span>
        )}
      </p>

      {user.approvalNote && (
        <div style={{ marginTop: 8 }}>
          <strong>Admin note:</strong>
          <div>{user.approvalNote}</div>
        </div>
      )}
    </div>
  );
}
