import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export default function Dropdown({
  onSort,
  items,
}: {
  onSort: (sort: string) => void;
  items: { label: string; value: string }[];
}) {
  return (
    <div className="">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Sort Items
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom start"
          className="w-[15rem] origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {items.map((item) => (
            <MenuItem key={item.value}>
              <button
                onClick={() => onSort(item.value)}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              >
                {item.label}
              </button>
            </MenuItem>
          ))}
          <div className="my-1 h-px bg-white/5" />
        </MenuItems>
      </Menu>
    </div>
  );
}
