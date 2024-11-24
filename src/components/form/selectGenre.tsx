import { BookSchema } from "@/lib/zod";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as SelectComponent,
} from "@/components/ui/select";

const Select = SelectComponent;

const SelectGenreTrigger = () => {
  return (
    <SelectTrigger>
      <SelectValue placeholder="Select a genre" />
    </SelectTrigger>
  );
};

const SelectGenreContent = () => {
  return (
    <SelectContent>
      {Object.values(BookSchema.shape.genre.enum).map((genre) => (
        <SelectItem key={genre} value={genre}>
          {genre.at(0) + genre.slice(1).toLowerCase()}
        </SelectItem>
      ))}
    </SelectContent>
  );
};

export { SelectGenreTrigger, SelectGenreContent, Select };
