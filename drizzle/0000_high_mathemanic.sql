CREATE TABLE `games` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`host` text NOT NULL,
	`host_name` text NOT NULL,
	`category` text NOT NULL,
	`questions` text NOT NULL,
	`status` text NOT NULL,
	`round` integer DEFAULT 0 NOT NULL,
	`deadline` integer DEFAULT 0 NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `players` (
	`game` text NOT NULL,
	`player` text NOT NULL,
	`name` text NOT NULL,
	`answers` text DEFAULT '[]' NOT NULL,
	`joined` integer NOT NULL,
	PRIMARY KEY(`game`, `player`),
	FOREIGN KEY (`game`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE no action
);
