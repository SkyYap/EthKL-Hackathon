"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function SimpleNavigationMenu() {
  return (
    <NavigationMenu className="absolute top-4 left-4">
      <NavigationMenuList className="flex space-x-4">
        <NavigationMenuItem>
          <Link href="/" passHref legacyBehavior>
            <NavigationMenuLink className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700">
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/profile" passHref legacyBehavior>
            <NavigationMenuLink className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700">
              Profile
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/settings" passHref legacyBehavior>
            <NavigationMenuLink className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700">
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
