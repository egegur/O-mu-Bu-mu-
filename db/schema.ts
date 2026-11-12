import { sqliteTable, text, integer, primaryKey, index } from 'drizzle-orm/sqlite-core';

export const games = sqliteTable('games', {
  id: text('id').primaryKey(),
  kind: text('kind').notNull(),
  host: text('host').notNull(),
  hostName: text('host_name').notNull(),
  category: text('category').notNull(),
  questions: text('questions').notNull(),
  status: text('status').notNull(),
  round: integer('round').notNull().default(0),
  deadline: integer('deadline').notNull().default(0),
  created: integer('created').notNull(),
}, (t) => [
  // Hız sınırı: bir oyuncunun son bir saatte açtığı oyunlar.
  index('games_host_created_idx').on(t.host, t.created),
  // Eski oyunların silinmesi.
  index('games_created_idx').on(t.created),
]);

export const players = sqliteTable('players', {
  game: text('game').notNull().references(() => games.id),
  player: text('player').notNull(),
  name: text('name').notNull(),
  answers: text('answers').notNull().default('[]'),
  joined: integer('joined').notNull(),
}, (t) => [
  primaryKey({ columns: [t.game, t.player] }),
  // Bir oyuncunun son oyunları (tekrar eden soruları azaltmak için).
  index('players_player_idx').on(t.player),
]);
