import { Books, Genre } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dateMatchModifiers, DateRange } from "react-day-picker";

const useBooks = (initialBooks: Books[] | undefined) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["books", initialBooks],
    queryFn: () => initialBooks,
    initialData: initialBooks,
  });

  const mutation = useMutation({
    mutationFn: async (params: {
      genres: Genre[];
      search: string;
      date: DateRange;
    }) => {
      const books = query.data;

      return books?.filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(params.search.toLowerCase()) ||
          book.author.toLowerCase().includes(params.search.toLowerCase());

        const matchesGenres =
          params.genres.length === 0 || params.genres.includes(book.genre);

        const matchesRelease = dateMatchModifiers(book.release, params.date);

        return matchesSearch && matchesGenres && matchesRelease;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  return { query, mutation } as const;
};

export default useBooks;
