CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`published_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`menu` text NOT NULL,
	`quantity` integer NOT NULL,
	`price` integer NOT NULL,
	`status` text NOT NULL,
	`ordered_at` integer NOT NULL
);
