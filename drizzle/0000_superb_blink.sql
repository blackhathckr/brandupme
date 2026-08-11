CREATE TABLE "ads" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"image" text NOT NULL,
	"target_url" text NOT NULL,
	"cta_label" text,
	"placement" text NOT NULL,
	"category_id" integer,
	"location_id" integer,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"weight" integer DEFAULT 1 NOT NULL,
	"impressions" integer DEFAULT 0 NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer NOT NULL,
	"parent_id" integer,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"icon" text,
	"image" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"listing_count" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category_relationships" (
	"category_id" integer NOT NULL,
	"related_category_id" integer NOT NULL,
	"strength" integer DEFAULT 5 NOT NULL,
	CONSTRAINT "category_relationships_category_id_related_category_id_pk" PRIMARY KEY("category_id","related_category_id")
);
--> statement-breakpoint
CREATE TABLE "category_translations" (
	"category_id" integer NOT NULL,
	"locale" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "category_translations_category_id_locale_pk" PRIMARY KEY("category_id","locale")
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"currency" text NOT NULL,
	"dial_code" text NOT NULL,
	"locales" jsonb NOT NULL,
	"default_locale" text DEFAULT 'en' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "countries_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "location_translations" (
	"location_id" integer NOT NULL,
	"locale" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "location_translations_location_id_locale_pk" PRIMARY KEY("location_id","locale")
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer NOT NULL,
	"parent_id" integer,
	"level" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"image" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plan_features" (
	"plan_id" integer NOT NULL,
	"feature_key" text NOT NULL,
	"feature_value" text NOT NULL,
	CONSTRAINT "plan_features_plan_id_feature_key_pk" PRIMARY KEY("plan_id","feature_key")
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"price_minor" integer NOT NULL,
	"currency" text NOT NULL,
	"billing_cycle" text DEFAULT 'monthly' NOT NULL,
	"purpose" text,
	"badge" text,
	"featured" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "auth_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"token_hash" text NOT NULL,
	"purpose" text NOT NULL,
	"payload" text,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"group_name" text DEFAULT 'general' NOT NULL,
	CONSTRAINT "permissions_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"role_id" integer NOT NULL,
	"permission_id" integer NOT NULL,
	CONSTRAINT "role_permissions_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_system" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "roles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"user_agent" text,
	"ip" text,
	"created_at" timestamp with time zone NOT NULL,
	CONSTRAINT "sessions_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	CONSTRAINT "user_roles_user_id_role_id_pk" PRIMARY KEY("user_id","role_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"email_verified_at" timestamp with time zone,
	"password_hash" text,
	"name" text NOT NULL,
	"phone" text,
	"avatar" text,
	"kind" text DEFAULT 'business' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "business_achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image" text,
	"achieved_on" timestamp with time zone,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_categories" (
	"business_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	CONSTRAINT "business_categories_business_id_category_id_pk" PRIMARY KEY("business_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "business_contacts" (
	"business_id" integer PRIMARY KEY NOT NULL,
	"phone" text,
	"whatsapp" text,
	"email" text,
	"website" text,
	"address" text,
	"area" text,
	"map_url" text,
	"facebook_url" text,
	"instagram_url" text,
	"linkedin_url" text,
	"x_url" text,
	"youtube_url" text,
	"tiktok_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_highlights" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"icon" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"url" text NOT NULL,
	"alt" text,
	"image_type" text DEFAULT 'gallery' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_locations" (
	"business_id" integer NOT NULL,
	"location_id" integer NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	CONSTRAINT "business_locations_business_id_location_id_pk" PRIMARY KEY("business_id","location_id")
);
--> statement-breakpoint
CREATE TABLE "business_offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"discount" text,
	"image" text,
	"starts_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_passports" (
	"business_id" integer PRIMARY KEY NOT NULL,
	"passport_number" text NOT NULL,
	"slug" text NOT NULL,
	"issued_at" timestamp with time zone NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "business_passports_passport_number_unique" UNIQUE("passport_number"),
	CONSTRAINT "business_passports_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "business_services" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"icon" text,
	"price_from_minor" integer,
	"price_to_minor" integer,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"plan_id" integer NOT NULL,
	"starts_at" timestamp with time zone NOT NULL,
	"expires_at" timestamp with time zone,
	"status" text DEFAULT 'pending_payment' NOT NULL,
	"auto_renew" boolean DEFAULT false NOT NULL,
	"payment_ref" text,
	"activated_by" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_timeline" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"image" text,
	"event_on" timestamp with time zone,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "businesses" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer NOT NULL,
	"owner_id" integer,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"tagline" text,
	"description" text,
	"logo" text,
	"cover_image" text,
	"established_year" integer,
	"team_size" text,
	"languages" jsonb,
	"working_hours" text,
	"business_type" text,
	"license_no" text,
	"registration_no" text,
	"status" text DEFAULT 'draft' NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"verified_at" timestamp with time zone,
	"verified_by" integer,
	"claim_token" text,
	"claimed_at" timestamp with time zone,
	"rating_avg" integer DEFAULT 0 NOT NULL,
	"rating_count" integer DEFAULT 0 NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "analytics_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer,
	"lead_id" integer,
	"event_type" text NOT NULL,
	"visitor_id" text,
	"source" text,
	"device" text,
	"meta" jsonb,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_recipients" (
	"id" serial PRIMARY KEY NOT NULL,
	"lead_id" integer NOT NULL,
	"business_id" integer NOT NULL,
	"routing" text DEFAULT 'primary' NOT NULL,
	"viewed_at" timestamp with time zone,
	"unlocked_at" timestamp with time zone,
	"unlock_source" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"reference" text NOT NULL,
	"business_id" integer,
	"customer_id" integer,
	"category_id" integer,
	"location_id" integer,
	"service_id" integer,
	"customer_name" text NOT NULL,
	"customer_phone" text NOT NULL,
	"customer_email" text,
	"customer_company" text,
	"message" text,
	"budget" text,
	"status" text DEFAULT 'new' NOT NULL,
	"source" text DEFAULT 'profile' NOT NULL,
	"ip" text,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "leads_reference_unique" UNIQUE("reference")
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"business_id" integer,
	"kind" text NOT NULL,
	"title" text NOT NULL,
	"body" text,
	"href" text,
	"read_at" timestamp with time zone,
	"emailed_at" timestamp with time zone,
	"created_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"author_id" integer,
	"author_name" text NOT NULL,
	"author_title" text,
	"rating" integer NOT NULL,
	"title" text,
	"body" text,
	"status" text DEFAULT 'published' NOT NULL,
	"reply" text,
	"replied_at" timestamp with time zone,
	"ip" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ads" ADD CONSTRAINT "ads_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ads" ADD CONSTRAINT "ads_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ads" ADD CONSTRAINT "ads_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_relationships" ADD CONSTRAINT "category_relationships_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_relationships" ADD CONSTRAINT "category_relationships_related_category_id_categories_id_fk" FOREIGN KEY ("related_category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_translations" ADD CONSTRAINT "category_translations_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "location_translations" ADD CONSTRAINT "location_translations_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan_features" ADD CONSTRAINT "plan_features_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plans" ADD CONSTRAINT "plans_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_achievements" ADD CONSTRAINT "business_achievements_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_categories" ADD CONSTRAINT "business_categories_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_categories" ADD CONSTRAINT "business_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_contacts" ADD CONSTRAINT "business_contacts_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_highlights" ADD CONSTRAINT "business_highlights_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_images" ADD CONSTRAINT "business_images_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_locations" ADD CONSTRAINT "business_locations_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_locations" ADD CONSTRAINT "business_locations_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_offers" ADD CONSTRAINT "business_offers_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_passports" ADD CONSTRAINT "business_passports_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_services" ADD CONSTRAINT "business_services_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_subscriptions" ADD CONSTRAINT "business_subscriptions_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_subscriptions" ADD CONSTRAINT "business_subscriptions_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_subscriptions" ADD CONSTRAINT "business_subscriptions_activated_by_users_id_fk" FOREIGN KEY ("activated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_timeline" ADD CONSTRAINT "business_timeline_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_recipients" ADD CONSTRAINT "lead_recipients_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lead_recipients" ADD CONSTRAINT "lead_recipients_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leads" ADD CONSTRAINT "leads_service_id_business_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."business_services"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ads_slot_idx" ON "ads" USING btree ("country_id","placement","status");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_country_slug_idx" ON "categories" USING btree ("country_id","slug");--> statement-breakpoint
CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "category_rel_strength_idx" ON "category_relationships" USING btree ("category_id","strength");--> statement-breakpoint
CREATE UNIQUE INDEX "locations_country_slug_idx" ON "locations" USING btree ("country_id","slug");--> statement-breakpoint
CREATE INDEX "locations_parent_idx" ON "locations" USING btree ("parent_id");--> statement-breakpoint
CREATE UNIQUE INDEX "plans_country_slug_idx" ON "plans" USING btree ("country_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "auth_tokens_hash_idx" ON "auth_tokens" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "sessions_user_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_kind_idx" ON "users" USING btree ("kind","status");--> statement-breakpoint
CREATE INDEX "business_achievements_business_idx" ON "business_achievements" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX "business_categories_category_idx" ON "business_categories" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "business_highlights_business_idx" ON "business_highlights" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX "business_images_business_idx" ON "business_images" USING btree ("business_id","sort_order");--> statement-breakpoint
CREATE INDEX "business_locations_location_idx" ON "business_locations" USING btree ("location_id");--> statement-breakpoint
CREATE INDEX "business_offers_business_idx" ON "business_offers" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX "passports_slug_idx" ON "business_passports" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "business_services_business_idx" ON "business_services" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX "subscriptions_business_idx" ON "business_subscriptions" USING btree ("business_id","status");--> statement-breakpoint
CREATE INDEX "business_timeline_business_idx" ON "business_timeline" USING btree ("business_id");--> statement-breakpoint
CREATE UNIQUE INDEX "businesses_country_slug_idx" ON "businesses" USING btree ("country_id","slug");--> statement-breakpoint
CREATE INDEX "businesses_status_idx" ON "businesses" USING btree ("country_id","status");--> statement-breakpoint
CREATE INDEX "businesses_owner_idx" ON "businesses" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "analytics_business_idx" ON "analytics_events" USING btree ("business_id","event_type","created_at");--> statement-breakpoint
CREATE INDEX "lead_recipients_business_idx" ON "lead_recipients" USING btree ("business_id");--> statement-breakpoint
CREATE INDEX "lead_recipients_lead_idx" ON "lead_recipients" USING btree ("lead_id");--> statement-breakpoint
CREATE INDEX "leads_business_idx" ON "leads" USING btree ("business_id","status");--> statement-breakpoint
CREATE INDEX "leads_created_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "notifications_user_idx" ON "notifications" USING btree ("user_id","read_at");--> statement-breakpoint
CREATE INDEX "notifications_business_idx" ON "notifications" USING btree ("business_id","read_at");--> statement-breakpoint
CREATE INDEX "reviews_business_idx" ON "reviews" USING btree ("business_id","status");