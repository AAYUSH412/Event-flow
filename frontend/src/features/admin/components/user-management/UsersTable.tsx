import { Edit, Mail, Trash2, UserMinus } from "lucide-react";
import { User } from "@/features/common/services";

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({ users, isLoading, onEdit, onDelete }: UsersTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <UserMinus className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mb-2">No users found</p>
        <p className="text-gray-400 text-sm mb-4">
          Try adjusting your search filters or add new users
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              User
            </th>
            <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Department
            </th>
            <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Joined
            </th>
            <th scope="col" className="relative px-6 py-3.5">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-indigo-500 dark:text-indigo-300 font-medium text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-gray-200">
                  {user.department || "—"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {user.createdAt ? formatDate(user.createdAt) : "—"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <UserActions user={user} onEdit={onEdit} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  let badgeClasses = "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ";
  
  switch (role) {
    case "ADMIN":
      badgeClasses += "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      break;
    case "ORGANIZER":
      badgeClasses += "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      break;
    case "STUDENT":
    default:
      badgeClasses += "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
  }
  
  return <span className={badgeClasses}>{role}</span>;
}

function UserActions({ 
  user, 
  onEdit, 
  onDelete 
}: { 
  user: User; 
  onEdit: (user: User) => void; 
  onDelete: (user: User) => void;
}) {
  return (
    <div className="flex items-center justify-end space-x-3">
      <button 
        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition"
        onClick={() => onEdit(user)}
        title="Edit user"
      >
        <Edit className="h-4 w-4" />
      </button>
      <a 
        href={`mailto:${user.email}`}
        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        title="Send email"
      >
        <Mail className="h-4 w-4" />
      </a>
      {user.role !== 'ADMIN' && (
        <button 
          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50 transition"
          onClick={() => onDelete(user)}
          title="Delete user"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
