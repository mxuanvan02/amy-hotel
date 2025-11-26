"use client";

import { useState, useMemo } from "react";
import { Branch } from "@/types/schema";
import { BranchCard } from "@/components/modules/BranchCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DestinationsListProps {
  initialBranches: Branch[];
  assetsBase: string;
}

const ITEMS_PER_PAGE = 6;

export function DestinationsList({
  initialBranches,
  assetsBase,
}: DestinationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and Sort Logic
  const filteredBranches = useMemo(() => {
    let result = [...initialBranches];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (branch) =>
          branch.name.toLowerCase().includes(query) ||
          branch.address?.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [initialBranches, searchQuery, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBranches.length / ITEMS_PER_PAGE);
  const paginatedBranches = filteredBranches.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="space-y-8">
      {/* Controls Header */}
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 border-gray-200 focus-visible:ring-[var(--color-primary)]"
          />
        </div>

        {/* Sort & Filter Actions */}
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] border-gray-200">
              <span>
                {sortBy === "name-asc"
                  ? "Name (A-Z)"
                  : sortBy === "name-desc"
                  ? "Name (Z-A)"
                  : "Sort by"}
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>

          {/* Placeholder for future advanced filters */}
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 text-gray-500"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      {paginatedBranches.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedBranches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              assetsBase={assetsBase}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg text-[var(--color-muted)]">
            No destinations found matching your search.
          </p>
          <Button
            variant="link"
            onClick={() => setSearchQuery("")}
            className="text-[var(--color-secondary)]"
          >
            Clear search
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm font-medium text-[var(--color-muted)] px-4">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
