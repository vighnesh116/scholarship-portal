import { useState } from "react";

function AdminAcces() {

    const [userid, setUserid] = useState("");

    const giveAdminAccess = async () => {

        const res = await fetch(
            `http://127.0.0.1:5000/admin-users/${userid}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await res.json();

        alert(data.message);
    };

    return (
        <div>
            <input
                type="number"
                placeholder="Enter User ID"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
            />

            <button onClick={giveAdminAccess}>
                Give Admin Access
            </button>
        </div>
    );
}

export default AdminAcces;