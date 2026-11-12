CREATE INDEX `games_host_created_idx` ON `games` (`host`,`created`);--> statement-breakpoint
CREATE INDEX `games_created_idx` ON `games` (`created`);--> statement-breakpoint
CREATE INDEX `players_player_idx` ON `players` (`player`);