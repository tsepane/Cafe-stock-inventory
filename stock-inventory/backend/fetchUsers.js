const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
