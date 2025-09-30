import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

export default function AdminArtisans() {
  const qc = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["artisans", "pending"],
    queryFn: async () => {
      const r = await api.get("/api/admin/artisans?status=pending");
      return r.data.data;
    },
  });

  const approve = useMutation({
    mutationFn: ({ id, status, note }) =>
      api.patch(`/api/admin/artisans/${id}/approval`, {
        approvalStatus: status,
        note,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["artisans", "pending"] }),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="panel">
      <h3>Pending Artisan Applications</h3>
      {data.length === 0 ? (
        <p>No pending applications.</p>
      ) : (
        data.map((a) => (
          <div key={a._id} className="card">
            <div>
              <strong>{a.name}</strong> — {a.email}
            </div>
            <p>{a.bio}</p>
            <div style={{ marginTop: 8 }}>
              <button
                className="btn"
                onClick={() =>
                  approve.mutate({ id: a._id, status: "approved" })
                }
              >
                Approve
              </button>
              <button
                className="btn danger"
                onClick={() => {
                  const note = prompt("Optional rejection note");
                  approve.mutate({ id: a._id, status: "rejected", note });
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
