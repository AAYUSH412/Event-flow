"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import { adminService } from "@/features/common/services";
import { User } from "@/features/common/services";
import DeleteUserModal from "@/features/admin/components/DeleteUserModal";
import EditUserModal from "@/features/admin/components/EditUserModal";
import { 
  UserFilters, 
  UsersTable, 
  Pagination, 
  PageHeader,
  UserStats
} from "@/features/admin/components/user-management";

type UserRole = "ADMIN" | "ORGANIZER" | "STUDENT";

// Extend the User type if needed properties are missing
interface ExtendedUser extends User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  createdAt?: string;
  profileImage?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<ExtendedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch users on initial load and when filters change
  useEffect(() => {
    fetchUsers(1, searchTerm, roleFilter);
  }, [searchTerm, roleFilter]);

  const fetchUsers = async (page = 1, search = searchTerm, role = roleFilter) => {
    setIsLoading(true);
    try {
      // Create filters object for API call
      const filters = {
        page,
        limit: 10, // You can adjust this or make it configurable
        search: search || undefined,
        role: role || undefined
      };

      // Use adminService to fetch user data from the backend
      const response = await adminService.getUsers(filters);
      
      setUsers(response.users);
      setTotalUsers(response.pagination.total);
      setTotalPages(response.pagination.pages);
      setCurrentPage(response.pagination.page);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchUsers(page, searchTerm, roleFilter);
    setCurrentPage(page);
  };

  const handleDeleteClick = (user: ExtendedUser) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (user: ExtendedUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    setIsDeleting(true);
    try {
      // Call the service method to delete the user
      await adminService.deleteUser(selectedUser._id);
      
      // Remove the user from the state
      setUsers(prevUsers => prevUsers.filter(user => user._id !== selectedUser._id));
      toast.success("User deleted successfully");
      setIsDeleteModalOpen(false);
      
      // Optionally refresh the user list to ensure consistency with backend
      fetchUsers(currentPage, searchTerm, roleFilter);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateUser = async (updatedUser: ExtendedUser) => {
    try {
      // Call the service to update the user on the backend
      await adminService.updateUser(updatedUser._id, {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        department: updatedUser.department,
        profileImage: updatedUser.profileImage
      });
      
      // Update the user in local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      
      setIsEditModalOpen(false);
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  // Function to handle search change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Function to handle role filter change
  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader 
        title="Manage Users"
        subtitle="View, edit and manage all users in the system"
        actionLink="/dashboard/admin/users/create"
        actionLabel="Add User"
        actionIcon={<UserPlus className="w-4 h-4 mr-2" />}
      />
      
      {/* Stats Overview */}
      <UserStats users={users} />
      
      {/* Filters */}
      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        roleFilter={roleFilter}
        onRoleFilterChange={handleRoleFilterChange}
      />
      
      {/* Users Table Container */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{users.length}</span> of{" "}
            <span className="font-medium">{totalUsers}</span> users
          </p>
        </div>
        
        {/* Users Table */}
        <UsersTable
          users={users}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      
      {/* Delete User Modal */}
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        user={selectedUser}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
      />
      
      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        user={selectedUser}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateUser}
      />
    </div>
  );
}