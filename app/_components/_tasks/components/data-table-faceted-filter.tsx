import { Button } from "@/_components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/_components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_components/ui/popover"
import { cn } from "@/_lib/utils"
import { Column } from "@tanstack/react-table"
import { Check, ChevronsUpDown } from "lucide-react"
import { SetStateAction, useState } from "react"

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  setState?: React.Dispatch<SetStateAction<string>>
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  setState,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])
  const [titleInput, setTitleInput] = useState("Selecione")

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsPopoverOpen(isOpen)
  }

  return (
    <Popover open={isPopoverOpen} onOpenChange={handleSheetOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-9 ${column ? "w-full md:w-[320px]" : "w-full"} h-10 justify-between border-solid`}
        >
          {titleInput}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[320px] bg-white p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />

          {column ? (
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup className="p-0 py-1">
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(option.value)
                        } else {
                          selectedValues.add(option.value)
                        }

                        setTitleInput(option.label)

                        const filterValues = Array.from(selectedValues)
                        column?.setFilterValue(
                          filterValues.length ? filterValues : undefined,
                        )
                      }}
                    >
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full border border-black",
                          isSelected
                            ? "bg-black text-white"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <Check />
                      </div>
                      {option.icon && (
                        <option.icon className="text-muted-foreground h-4 w-4" />
                      )}
                      <span>{option.label}</span>
                      {facets?.get(option.value) && (
                        <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                          {facets.get(option.value)}
                        </span>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>

              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />

                  <CommandGroup>
                    <CommandItem
                      onSelect={() => column?.setFilterValue(undefined)}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          ) : (
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              <CommandGroup>
                {options.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        setState!(option.label)
                        setTitleInput(option.label)
                        setIsPopoverOpen(false)
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-black",
                          titleInput === option.label
                            ? "bg-black text-white"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <Check />
                      </div>

                      {option.icon && (
                        <option.icon className="text-muted-foreground mr-2 h-4 w-4" />
                      )}

                      <span>{option.label}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
