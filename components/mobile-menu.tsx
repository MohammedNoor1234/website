"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  const menuItems = ["Portfolio", "Marketing", "Tools", "Games", "Apps", "About"]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 md:hidden rounded-md hover:bg-gray-100">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col space-y-4 mt-8">
          {menuItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
