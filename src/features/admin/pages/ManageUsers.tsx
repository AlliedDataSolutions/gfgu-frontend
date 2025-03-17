import { Button } from "@/components/ui/button";
import {
  Filter,
  SquareChevronLeft,
  SquareChevronRight,
} from "lucide-react";
import UserTable from "../components/UserTable";
import { useState } from "react";
import { FilterUsers, useManageUser } from "../hooks/useManageUser";
import { User } from "@/core/user";
import InlineLoader from "@/components/ui/inlineloading";
import UserFilter from "../components/UserFilter";
import { Input } from "@/components/ui/input";

export const ManageUsers = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterUsers>({
    page: 1,
    limit: 10,
    search: "",
    isConfirmed: undefined,
    account: [],
    status: [],
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission (if inside a form)
      handleSearch(searchQuery);
    }
  };
  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
  };

  const { loading, allUserData, confirmUser, setVendorStatus, deleteUser } =
    useManageUser(filters);

  if (loading) {
    return <InlineLoader loading={loading} children={undefined} />;
  }

  const handleNextPages = () => {
    setFilters((prev) => ({
      ...prev,
      page: (prev.page ?? 1) + 1,
    }));
  };

  const handlePreviousPages = () => {
    setFilters((prev) => ({
      ...prev,
      page: (prev.page ?? 1) - 1,
    }));
  };

  return (
    <div className="flex flex-col p-3 bg-white gap-4 h-full">
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">

        <Input
          className="max-w-72 border border-neutral-500 px-3 py-2 rounded-md"
          type="search"
          placeholder={"What are you looking for"}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value === "") {
              handleSearch(""); 
            }
          }}
          onKeyDown={handleKeyDown} 
          
        />

        <Button
          onClick={() => setShowFilter(true)}
          className="max-w-32 border-neutral-500"
          variant={"outline"}
        >
          <span>Filter</span>
          <Filter />
        </Button>
      </div>

      <UserFilter
        open={showFilter}
        onOpenChange={setShowFilter}
        filterOptions={filters}
        setFilterOptions={setFilters}
      />

      {/* Table - list of users */}
      <div className="flex-1 overflow-auto">
        <UserTable
          loading
          users={allUserData.users}
          handleDelete={function (user: User): void {
            deleteUser(user.id);
          }}
          handleAction={function (user: User, action: string): void {
            if (action === "enable" || "disable") {
              confirmUser(user.id);
            } else {
              setVendorStatus(user.id, action);
            }
          }}
        />
      </div>

      {/* Sticky Footer */}
      <div className="mt-auto">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {allUserData.page} of {allUserData.totalPages}
          </div>
          <div className="flex gap-1">
            <Button
              variant={"ghost"}
              disabled={allUserData.page < 2}
              onClick={handlePreviousPages}
            >
              <SquareChevronLeft size={18} />
            </Button>
            <Button
              variant={"ghost"}
              disabled={allUserData.page >= allUserData.totalPages}
              onClick={handleNextPages}
            >
              <SquareChevronRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
