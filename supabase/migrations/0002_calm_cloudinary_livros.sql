ALTER TABLE "livros"
ALTER COLUMN "capa" TYPE jsonb
USING jsonb_build_object(
  'capaUrl', "capa",
  'capaPublicId', concat('legacy/livros/', coalesce("slug", "id"::text), '/capa')
);
