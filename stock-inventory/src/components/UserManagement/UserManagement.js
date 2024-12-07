import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    // Fetch users from the API
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newUserName, email: newUserEmail }),
            });
            const newUser = await response.json();
            setUsers([...users, newUser]); // Add the new user to the state
            setNewUserName('');
            setNewUserEmail('');
            setShowAddUserForm(false); // Hide the form after adding user
            alert('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user');
        }
    };

    const handleEditUser = (userId) => {
        alert(`Edit User with ID: ${userId}`);
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error response:", errorText);
                alert(`Error deleting user: ${errorText}`);
                return;
            }

            setUsers(users.filter(user => user.id !== userId)); // Remove the deleted user from the list
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <p>Manage users here.</p>

            <button onClick={() => setShowAddUserForm(!showAddUserForm)}>
                {showAddUserForm ? 'Cancel' : 'Add User'}
            </button>

            {showAddUserForm && (
                <form onSubmit={handleAddUser}>
                    <input
                        type="text"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Enter Name"
                        required
                    />
                    <input
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="Enter Email"
                        required
                    />
                    <button type="submit">Add User</button>
                </form>
            )}

            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
