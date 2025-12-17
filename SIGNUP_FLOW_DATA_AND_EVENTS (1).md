# Signup Flow - Data Collection & Analytics Events

> **Product Designer Documentation for Marketing Team**  
> This document contains all information and events that need to be collected and logged during the Signup process.

---

## 📋 Table of Contents
1. [Flow Overview](#flow-overview)
2. [Form Data Collection](#form-data-collection)
3. [Analytics Events](#analytics-events)
4. [Event Properties](#event-properties)

---

## 🎯 Flow Overview

The Signup process consists of three main parts:

### **Part 1: Authentication**
- Email/OTP or Google Auth
- **Note:** If user already exists, they are redirected to their community (signup flow does not continue)

### **Part 2: Main Signup Flow**
1. Basic Info (Name - prefilled from email/Google)
2. Industry Selection (Auto-detected from email domain via Brandfetch)
3. Role Selection
4. Integrations (19 integrations available)
5. Enterprise Features (Optional - conditional step)
6. Community Name (Create new or Migrate existing)

### **Part 3: Community Setup Flow (Wizard)**
1. Objectives
2. Branding (Auto-detected via Brandfetch)
3. Spaces (Minimum 2 required)
4. Plan Selection (2 versions: softlaunch / main)

---

## 💾 Form Data Collection

---

## Part 1: Authentication

### **Authentication Step**
**Store Key:** `signup.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `email` | string | User email address | `user@example.com` | ✅ Yes |
| `authMethod` | enum | Authentication method | `email` or `google` | ✅ Yes |

**Authentication Flow:**
- **Email Signup:** System uses OTP (One-Time Password), not permanent password
- **Existing Users:** If email already registered, user is redirected to their community (signup does not continue)

---

## Part 2: Main Signup Flow

### 1️⃣ **Basic Info Step**
**Store Key:** `signup.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `firstName` | string | First name | `John` | ✅ Yes |
| `lastName` | string | Last name | `Doe` | ✅ Yes |

**Auto-fill Logic:**
- Name is prefilled from email (before @ symbol) or Google auth data
- If work email, system fetches company brand data (Brandfetch)

### 2️⃣ **Industry Selection Step**
**Store Key:** `signup.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `industry` | string | User's industry | `SAAS`, `EDUCATION`, `HEALTHCARE`, `FINANCE`, `ECOMMERCE`, etc. | ✅ Yes |

**Industry Options:**
- SaaS / Technology
- Education
- Healthcare
- Finance
- E-commerce
- Other (with extensive search list)

**Auto-Detection:**
- System fetches brand data from email domain (Brandfetch)
- Maps fetched industry to our industry options
- Pre-selects matching industry if found

### 3️⃣ **Role Selection Step**
**Store Key:** `signup.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `role` | string | User's role | `COMMUNITY_MANAGER`, `MARKETING`, `PRODUCT`, `CUSTOMER_SUCCESS`, `FOUNDER_CEO`, `SALES`, `ENGINEERING`, `OTHER` | ✅ Yes |

**Role Options:**
- Community Manager
- Head of Marketing
- Product Manager
- Customer Success Manager
- Founder / CEO
- Sales
- Engineering
- Other (with extensive search list of 50+ roles)

**Note:** If "Other" is selected, dropdown with 50+ job roles is displayed.

### 4️⃣ **Integrations Step**
**Store Key:** `signup.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `integrations` | string[] | List of selected integrations | `["slack", "zapier", "hubspot"]` | ❌ No (can skip) |

**Integration Options (19 total):**

**Starter Plan (6 integrations):**
1. Google Analytics
2. Zapier
3. Make.com
4. Slack
5. Discord
6. Mailchimp

**Growth & Enterprise Plans (13 additional):**
7. Google Tag Manager
8. Usercentrics
9. Jira
10. Custom Code Snippet
11. OneTrust
12. Fullstory
13. Hotjar
14. Amplitude
15. Mixpanel
16. Hubspot
17. Zendesk
18. Intercom
19. Salesforce

**User Actions:**
- Select integrations
- Click "Continue" OR
- Click "No integrations needed for now" (skip)

### 5️⃣ **Enterprise Features Step (Conditional)**
**Store Key:** `signup.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `enterpriseFeatures` | string[] | List of selected enterprise features | `["saml-sso", "data-residency"]` | ❌ No |
| `wantsEnterpriseSupport` | boolean | User requested enterprise support | `true` or `false` | ✅ Yes |

**Question Shown:**
> **Looking for enterprise‑grade control and support?**  
> Get advanced security, enterprise controls, and a dedicated CSM. We'll tailor your plan in a quick call with our sales team.

**User Actions:**
- Click "No, Continue without enterprise features" → Skip to Community Name
- Click "Yes" → Show enterprise features list

**Enterprise Features (8 total):**
1. SAML single sign-on
2. Data residency
3. SOC 2 (Type 2)
4. GDPR & CCPA
5. Uptime SLA
6. Data Encryption
7. JWT
8. Audit Log

**User Can:**
- Select individual features
- Click "Select all"
- Continue

---

### 6️⃣ **Community Name Step**
**Store Key:** `signup.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `communityName` | string | Community name (for new) | `Acme Community` | Conditional |
| `existingCommunityUrl` | string | Existing community URL (for migration) | `https://community.acme.com` | Conditional |

**Message Shown:**
> **Create a new community**, but if you already have one on another platform, we can help you migrate.

**User Actions:**
1. **Create a new community**
   - Input: Community name (required)
   - Placeholder: "e.g., Acme Community"
   - Hint: "We'll use this name across your workspace and emails."
   - CTAs: "Continue" | "Migrate my community"

2. **Migrate my community**
   - Input: Current community URL (required)
   - Placeholder: "e.g., https://mycommunity.com"
   - Hint: "Enter the URL of your existing community that you want to migrate."
   - CTAs: "Continue" | "Create new community instead"

**Flow Logic:**
- If user selects **Migrate** → Goes directly to **Plan Selection** (skips Objectives, Branding, Spaces)
- If user selects **Create new** → Continues to Community Setup (Wizard)
- If Migrate → Enterprise plan is recommended (with "Talk to sales" CTA)

---

---

## Part 3: Community Setup Flow (Wizard)

**Note:** Community Name was already collected in Main Signup Flow (Step 6).  
**Note:** If user selected "Migrate", they skip directly to Plan Selection.

---

### 1️⃣ **Objectives Step**
**Store Key:** `wizard.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `objectives` | string[] | Community objectives | `["leads-referrals", "retention-loyalty"]` | ✅ Yes (min 1) |

**Objective Options:**
- `leads-referrals` - Generate High-Quality Leads & Referrals
- `retention-loyalty` - Increase Customer Retention & Loyalty
- `product-adoption` - Boost Product Adoption & Success
- `support-costs` - Scale Customer Support & Reduce Costs
- `networking` - Enable Customer-to-Customer Networking
- `feedback-innovation` - Drive Product Feedback & Innovation

**Notes:**
- User can select multiple objectives
- Each objective has a description shown in tooltip

---

### 2️⃣ **Branding Step**
**Store Key:** `wizard.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `websiteUrl` | string | Website URL for auto-detect | `https://acme.com` | ❌ No |
| `logoUrl` | string \| null | Logo URL | `https://logo.clearbit.com/acme.com` | ❌ No |
| `primaryColor` | string | Primary brand color (hex) | `#6366f1` | ✅ Yes (default: `#6366f1`) |
| `previewTheme` | enum | Preview theme | `light` or `dark` | ✅ Yes (default: `light`) |

**Auto-Detection Features (Brandfetch):**
- System displays brand data fetched from email domain (from Main Signup Step 1)
- If no data, user can enter/update website URL
- System auto-detects logo and primary color from URL
- Uses Brandfetch API for brand data

**User Can:**
- Accept auto-detected branding
- Update website URL to refetch
- Manually set logo (upload or URL)
- Manually select primary color
- Continue with defaults

**Logo Options:**
- No logo
- Auto-detected logo (Brandfetch)
- Custom upload
- URL input

---

### 3️⃣ **Spaces Step**
**Store Key:** `wizard.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `spaces` | string[] | Selected spaces | `["feed", "discussions", "events"]` | ✅ Yes (min 2) |

**Space Categories:**

**Featured Spaces:**
- `feed` - Feed
- `discussions` - Discussions
- `events` - Events
- `qa` - Q&A
- `articles` - Articles
- `directory` - Member Directory

**Additional Spaces:**
- `docs` - Docs
- `courses` - Courses
- `challenges` - Challenges
- `resources` - Resources
- `jobs` - Jobs Board
- `marketplace` - Marketplace
- `podcasts` - Podcasts
- `webinars` - Webinars

**Notes:**
- Minimum 2 spaces must be selected
- Each space has icon and description

---

### 4️⃣ **Plan Selection Step**
**Store Key:** `wizard.form`

| Field Name | Type | Description | Example | Required |
|------------|------|-------------|---------|----------|
| `billingPeriod` | enum | Billing period | `annual` or `monthly` | ✅ Yes (default: `annual`) |
| `selectedPlan` | string | Selected plan | `starter`, `growth`, `enterprise` | ✅ Yes |

**Billing Toggle:**
- Annual
- Monthly

**Two Versions of Plan Selection:**

#### **Version 1: Softlaunch**
**Plans Available:**
1. **Starter Plan**
   - CTA: "Join waitlist"
   
2. **Enterprise Plan**
   - CTA: "Talk to sales"

#### **Version 2: Main (Full Launch)**
**Plans Available:**
1. **Starter Plan**
   - CTA: "14-days trial"
   
2. **Growth Plan**
   - CTA: "14-day trial"
   - Additional CTA: "Request a demo"
   
3. **Enterprise Plan**
   - CTA: "Talk to Sales"

**AI Recommendation Logic:**
Based on previous steps data:
- Integrations selected (especially Growth/Enterprise integrations)
- Enterprise features selected
- Migration choice
- Industry
- Role

System recommends one of the 3 plans and displays personalized message on right side.

**Personalized Message Example:**
> **Ready to transform customer connections, Amir?**
> 
> Your computer software company is perfectly positioned for community success. With Bettermode's 11-person team and your current tools already in place, the Starter plan accelerates your community launch.
> 
> Turn customer interactions into lasting relationships while your organization builds momentum for bigger wins ahead.
> 
> — Mo Malayeri  
> CEO at Bettermode

**Recommendation Factors:**
- If Migration selected → Enterprise recommended
- If 7+ Growth/Enterprise integrations selected → Growth or Enterprise
- If Enterprise features selected → Enterprise
- Otherwise → Starter

**Notes:**
- Recommended plan has special highlighting
- All plans show pricing for selected billing period (Annual/Monthly)
- Annual billing shows savings percentage

---

## 📊 Analytics Events

### Event Naming Convention
Format: `signup_[step]_[action]` or `wizard_[step]_[action]`

---

## Part 1: Authentication Events

#### 1. `signup_started`
**Trigger:** User enters signup page

**Properties:**
```javascript
{
  timestamp: Date,
  page_url: string,
  referrer: string,
  utm_source?: string,
  utm_medium?: string,
  utm_campaign?: string,
  device_type: 'mobile' | 'tablet' | 'desktop',
  browser: string,
  os: string
}
```

---

#### 2. `signup_email_entered`
**Trigger:** User enters their email

**Properties:**
```javascript
{
  timestamp: Date,
  email_domain: string, // domain only, not full email
  is_work_email: boolean,
  is_existing_user: boolean, // is this email already registered
  auth_method: 'email'
}
```

---

#### 3. `signup_otp_requested`
**Trigger:** System sends OTP to user

**Properties:**
```javascript
{
  timestamp: Date,
  email_domain: string,
  auth_method: 'email',
  otp_delivery_method: 'email' // future: 'sms' may be added
}
```

---

#### 4. `signup_otp_entered`
**Trigger:** User enters OTP code

**Properties:**
```javascript
{
  timestamp: Date,
  is_valid: boolean,
  attempts_count: number, // number of OTP entry attempts
  auth_method: 'email'
}
```

---

#### 5. `signup_existing_user_redirected`
**Trigger:** Existing user is identified and redirected to their community

**Properties:**
```javascript
{
  timestamp: Date,
  email_domain: string,
  redirect_to: string, // user's community URL
  has_active_community: boolean
}
```

---

#### 6. `signup_google_auth_clicked`
**Trigger:** User clicks Google auth button

**Properties:**
```javascript
{
  timestamp: Date,
  auth_method: 'google'
}
```

---

#### 7. `signup_google_auth_completed`
**Trigger:** Google authentication completes successfully

**Properties:**
```javascript
{
  timestamp: Date,
  auth_method: 'google',
  email_domain: string,
  is_work_email: boolean
}
```

---

## Part 2: Main Signup Flow Events

### **Step Navigation Events**

#### 8. `signup_step_viewed`
**Trigger:** New step is displayed

**Properties:**
```javascript
{
  timestamp: Date,
  step_number: number,
  step_name: string, // 'basic_info', 'industry', 'role', 'integrations', 'enterprise_features', 'community_name'
  time_from_start: number // milliseconds
}
```

---

### **Basic Info Events**

#### 9. `signup_name_entered`
**Trigger:** User enters name and continues

**Properties:**
```javascript
{
  timestamp: Date,
  has_first_name: boolean,
  has_last_name: boolean,
  was_prefilled: boolean, // from email or Google
  time_spent_on_step: number // seconds
}
```

---

#### 10. `signup_brand_data_fetched`
**Trigger:** System fetches company brand data (for work emails)

**Properties:**
```javascript
{
  timestamp: Date,
  email_domain: string,
  brand_detected: boolean,
  company_name?: string,
  company_domain?: string,
  logo_found: boolean,
  industry_detected?: string
}
```

---

### **Role Selection Events**

#### 11. `signup_role_selected`
**Trigger:** User selects a role

**Properties:**
```javascript
{
  timestamp: Date,
  role: string,
  role_category: 'predefined' | 'other',
  time_spent_on_step: number,
  is_auto_advanced: boolean // true if immediately advanced to next step
}
```

---

#### 12. `signup_role_other_clicked`
**Trigger:** User clicks "Other" option

**Properties:**
```javascript
{
  timestamp: Date,
  previous_selections_count: number
}
```

---

#### 13. `signup_role_search_opened`
**Trigger:** Role search dropdown opens

**Properties:**
```javascript
{
  timestamp: Date
}
```

---

#### 14. `signup_role_searched`
**Trigger:** User searches in role list

**Properties:**
```javascript
{
  timestamp: Date,
  search_query: string,
  results_count: number
}
```

---

### **Industry Selection Events**

#### 15. `signup_industry_preselected`
**Trigger:** System suggests an industry based on brand data

**Properties:**
```javascript
{
  timestamp: Date,
  suggested_industry: string,
  confidence_score?: number,
  source: 'brandfetch'
}
```

---

#### 16. `signup_industry_selected`
**Trigger:** User selects an industry

**Properties:**
```javascript
{
  timestamp: Date,
  industry: string,
  was_preselected: boolean,
  accepted_suggestion: boolean, // if suggestion was accepted
  time_spent_on_step: number
}
```

---

#### 17. `signup_industry_other_clicked`
**Trigger:** User clicks "Other" option

**Properties:**
```javascript
{
  timestamp: Date
}
```

---

#### 18. `signup_industry_searched`
**Trigger:** User searches in industry list

**Properties:**
```javascript
{
  timestamp: Date,
  search_query: string,
  results_count: number
}
```

---

### **Integrations Events**

#### 19. `signup_integrations_viewed`
**Trigger:** User views integrations page

**Properties:**
```javascript
{
  timestamp: Date,
  total_integrations_available: 19 // Always 19 integrations
}
```

---

#### 20. `signup_integration_selected`
**Trigger:** User selects an integration

**Properties:**
```javascript
{
  timestamp: Date,
  integration_id: string,
  integration_name: string,
  is_growth_enterprise_only: boolean, // true if only in Growth/Enterprise plans
  plan_tier: 'starter' | 'growth_enterprise', // which plan tier
  total_selected: number
}
```

---

#### 21. `signup_integration_deselected`
**Trigger:** User deselects an integration

**Properties:**
```javascript
{
  timestamp: Date,
  integration_id: string,
  integration_name: string,
  total_selected: number
}
```

---

#### 22. `signup_integrations_select_all_clicked`
**Trigger:** User clicks "Select all" button

**Properties:**
```javascript
{
  timestamp: Date,
  action: 'select_all' | 'unselect_all',
  total_integrations: 19
}
```

---

#### 23. `signup_integrations_submitted`
**Trigger:** User clicks Continue

**Properties:**
```javascript
{
  timestamp: Date,
  selected_integrations: string[],
  integrations_count: number,
  has_growth_enterprise_integrations: boolean, // has any from Growth/Enterprise tier
  starter_integrations_count: number, // count from starter tier (max 6)
  growth_enterprise_integrations_count: number, // count from Growth/Enterprise tier
  time_spent_on_step: number
}
```

---

#### 24. `signup_integrations_skipped`
**Trigger:** User clicks "No integrations needed for now"

**Properties:**
```javascript
{
  timestamp: Date,
  time_spent_on_step: number
}
```

---

### **Enterprise Features Events**

#### 25. `signup_enterprise_question_viewed`
**Trigger:** Enterprise features question is displayed

**Properties:**
```javascript
{
  timestamp: Date,
  step_number: 5
}
```

---

#### 26. `signup_enterprise_question_no_clicked`
**Trigger:** User clicks "No, Continue without enterprise features"

**Properties:**
```javascript
{
  timestamp: Date,
  time_spent_on_question: number // seconds
}
```

---

#### 27. `signup_enterprise_features_opened`
**Trigger:** User clicks "Yes" and features list is shown

**Properties:**
```javascript
{
  timestamp: Date
}
```

---

#### 28. `signup_enterprise_feature_selected`
**Trigger:** User selects an enterprise feature

**Properties:**
```javascript
{
  timestamp: Date,
  feature_id: string,
  feature_name: string,
  total_selected: number
}
```

---

#### 29. `signup_enterprise_feature_deselected`
**Trigger:** User deselects an enterprise feature

**Properties:**
```javascript
{
  timestamp: Date,
  feature_id: string,
  feature_name: string,
  total_selected: number
}
```

---

#### 30. `signup_enterprise_features_select_all_clicked`
**Trigger:** User clicks "Select all" button

**Properties:**
```javascript
{
  timestamp: Date,
  action: 'select_all' | 'unselect_all',
  total_features: 8
}
```

---

#### 31. `signup_enterprise_features_submitted`
**Trigger:** User submits enterprise features selection

**Properties:**
```javascript
{
  timestamp: Date,
  selected_features: string[],
  features_count: number,
  time_spent_on_step: number
}
```

---

### **Community Name Events**

#### 32. `signup_community_creation_method_selected`
**Trigger:** User clicks "Create new" or "Migrate"

**Properties:**
```javascript
{
  timestamp: Date,
  method: 'create_new' | 'migrate'
}
```

---

#### 33. `signup_community_name_entered`
**Trigger:** User enters community name

**Properties:**
```javascript
{
  timestamp: Date,
  name_length: number,
  has_special_chars: boolean
}
```

---

#### 34. `signup_migration_url_entered`
**Trigger:** User enters previous community URL

**Properties:**
```javascript
{
  timestamp: Date,
  url_domain: string,
  is_valid_url: boolean
}
```

---

#### 35. `signup_community_name_submitted`
**Trigger:** User clicks Continue (Create New)

**Properties:**
```javascript
{
  timestamp: Date,
  method: 'create_new',
  name_length: number,
  time_spent_on_step: number
}
```

---

#### 36. `signup_migration_submitted`
**Trigger:** User clicks Continue (Migration)

**Properties:**
```javascript
{
  timestamp: Date,
  method: 'migrate',
  source_domain: string,
  time_spent_on_step: number,
  will_skip_wizard_steps: true // User will skip to Plan Selection
}
```

---

#### 37. `signup_success_viewed`
**Trigger:** Success page with confetti is displayed

**Properties:**
```javascript
{
  timestamp: Date,
  animation_played: boolean,
  community_method: 'create_new' | 'migrate'
}
```

---

#### 38. `signup_completed`
**Trigger:** Main signup flow completes and transitions to wizard

**Properties:**
```javascript
{
  timestamp: Date,
  total_time: number, // seconds from start to finish
  auth_method: 'email' | 'google',
  role: string,
  industry: string,
  industry_was_auto_detected: boolean,
  integrations_count: number,
  has_enterprise_features: boolean,
  enterprise_features_count: number,
  community_method: 'create_new' | 'migrate',
  has_work_email: boolean,
  steps_completed: 6
}
```

---

---

## Part 3: Community Setup (Wizard) Events

### **Wizard Navigation Events**

#### 39. `wizard_started`
**Trigger:** User enters wizard flow

**Properties:**
```javascript
{
  timestamp: Date,
  came_from_signup: boolean,
  signup_completion_time: number, // if came from signup
  is_migration_flow: boolean // true if user selected migrate in step 6
}
```

**Note:** If `is_migration_flow = true`, user skips directly to Plan Selection (Step 4)

---

#### 40. `wizard_step_viewed`
**Trigger:** New wizard step is displayed

**Properties:**
```javascript
{
  timestamp: Date,
  step_number: number, // 1-4
  step_name: string, // 'objectives', 'branding', 'spaces', 'plan_selection'
  time_from_wizard_start: number,
  is_migration_flow: boolean
}
```

---

---

### **Objectives Events**

#### 41. `wizard_objectives_viewed`
**Trigger:** User views objectives page

**Properties:**
```javascript
{
  timestamp: Date,
  total_objectives_available: 6
}
```

---

#### 42. `wizard_objective_selected`
**Trigger:** User selects an objective

**Properties:**
```javascript
{
  timestamp: Date,
  objective_id: string,
  objective_name: string,
  total_selected: number
}
```

---

#### 43. `wizard_objective_deselected`
**Trigger:** User deselects an objective

**Properties:**
```javascript
{
  timestamp: Date,
  objective_id: string,
  objective_name: string,
  total_selected: number
}
```

---

#### 44. `wizard_objective_tooltip_viewed`
**Trigger:** User views objective tooltip

**Properties:**
```javascript
{
  timestamp: Date,
  objective_id: string,
  objective_name: string
}
```

---

#### 45. `wizard_objectives_submitted`
**Trigger:** User submits objectives

**Properties:**
```javascript
{
  timestamp: Date,
  selected_objectives: string[],
  objectives_count: number,
  time_spent_on_step: number
}
```

---

### **Branding Events**

#### 46. `wizard_branding_viewed`
**Trigger:** User views branding page

**Properties:**
```javascript
{
  timestamp: Date,
  has_brand_data: boolean, // brand data already fetched from email domain
  auto_detected_logo: boolean,
  auto_detected_color: boolean,
  brand_source: 'brandfetch' | 'manual' | 'none'
}
```

---

#### 47. `wizard_website_url_entered`
**Trigger:** User enters/updates website URL for auto-detect

**Properties:**
```javascript
{
  timestamp: Date,
  domain: string,
  is_valid_url: boolean,
  is_update: boolean // true if updating existing URL
}
```

---

#### 48. `wizard_brand_auto_detect_started`
**Trigger:** Auto-detect process starts (Brandfetch)

**Properties:**
```javascript
{
  timestamp: Date,
  website_url: string
}
```

---

#### 49. `wizard_brand_auto_detect_completed`
**Trigger:** Auto-detect completes (Brandfetch)

**Properties:**
```javascript
{
  timestamp: Date,
  success: boolean,
  logo_found: boolean,
  color_detected: boolean,
  brand_name?: string,
  detection_time: number // milliseconds
}
```

---

#### 50. `wizard_logo_option_selected`
**Trigger:** User selects logo option

**Properties:**
```javascript
{
  timestamp: Date,
  logo_option: 'no_logo' | 'auto_detected' | 'custom_upload' | 'url_input',
  has_logo: boolean
}
```

---

#### 51. `wizard_logo_uploaded`
**Trigger:** User uploads a logo

**Properties:**
```javascript
{
  timestamp: Date,
  file_size: number, // bytes
  file_type: string, // 'image/png', 'image/jpeg', etc.
  upload_success: boolean
}
```

---

#### 52. `wizard_primary_color_changed`
**Trigger:** User changes primary color

**Properties:**
```javascript
{
  timestamp: Date,
  new_color: string, // hex color
  previous_color: string,
  was_auto_detected: boolean,
  source: 'color_picker' | 'brandfetch' | 'default'
}
```

---

#### 53. `wizard_theme_toggled`
**Trigger:** User toggles between light and dark theme preview

**Properties:**
```javascript
{
  timestamp: Date,
  new_theme: 'light' | 'dark',
  previous_theme: 'light' | 'dark'
}
```

---

#### 54. `wizard_branding_submitted`
**Trigger:** User completes branding step

**Properties:**
```javascript
{
  timestamp: Date,
  has_logo: boolean,
  logo_source: 'no_logo' | 'brandfetch' | 'custom_upload' | 'url_input',
  primary_color: string,
  color_source: 'brandfetch' | 'custom' | 'default',
  preview_theme: 'light' | 'dark',
  used_auto_detection: boolean,
  time_spent_on_step: number
}
```

---

### **Spaces Events**

#### 55. `wizard_spaces_viewed`
**Trigger:** User views spaces page

**Properties:**
```javascript
{
  timestamp: Date,
  total_spaces_available: 14, // 6 featured + 8 additional
  featured_spaces_count: 6,
  additional_spaces_count: 8
}
```

---

#### 56. `wizard_space_selected`
**Trigger:** User selects a space

**Properties:**
```javascript
{
  timestamp: Date,
  space_id: string,
  space_name: string,
  space_category: 'featured' | 'additional',
  total_selected: number
}
```

---

#### 57. `wizard_space_deselected`
**Trigger:** User deselects a space

**Properties:**
```javascript
{
  timestamp: Date,
  space_id: string,
  space_name: string,
  total_selected: number
}
```

---

#### 58. `wizard_spaces_submitted`
**Trigger:** User submits spaces selection

**Properties:**
```javascript
{
  timestamp: Date,
  selected_spaces: string[],
  spaces_count: number,
  featured_spaces_count: number, // count from featured category
  additional_spaces_count: number, // count from additional category
  time_spent_on_step: number
}
```

---

### **Plan Selection Events**

#### 59. `wizard_plan_selection_viewed`
**Trigger:** User views plan selection page

**Properties:**
```javascript
{
  timestamp: Date,
  recommended_plan: 'starter' | 'growth' | 'enterprise',
  recommendation_factors: {
    role: string,
    industry: string,
    objectives_count: number,
    integrations_count: number,
    has_growth_enterprise_integrations: boolean,
    has_enterprise_features: boolean,
    is_migration: boolean
  },
  plan_version: 'softlaunch' | 'main', // which version is shown
  personalized_message_shown: boolean
}
```

---

#### 60. `wizard_billing_period_toggled`
**Trigger:** User toggles between annual and monthly

**Properties:**
```javascript
{
  timestamp: Date,
  new_period: 'annual' | 'monthly',
  previous_period: 'annual' | 'monthly'
}
```

---

#### 61. `wizard_plan_card_viewed`
**Trigger:** User views a plan card (mobile with expand/collapse)

**Properties:**
```javascript
{
  timestamp: Date,
  plan_id: string,
  plan_name: string,
  is_recommended: boolean,
  billing_period: 'annual' | 'monthly',
  price_shown: string,
  plan_version: 'softlaunch' | 'main'
}
```

---

#### 62. `wizard_plan_card_expanded` **(Mobile Only)**
**Trigger:** User expands a plan card

**Properties:**
```javascript
{
  timestamp: Date,
  plan_id: string,
  plan_name: string,
  is_recommended: boolean
}
```

---

#### 63. `wizard_plan_card_collapsed` **(Mobile Only)**
**Trigger:** User collapses a plan card

**Properties:**
```javascript
{
  timestamp: Date,
  plan_id: string,
  plan_name: string,
  time_expanded: number // seconds
}
```

---

#### 64. `wizard_request_demo_clicked`
**Trigger:** User clicks "Request a demo"

**Properties:**
```javascript
{
  timestamp: Date,
  plan_id: 'growth', // always growth plan
  plan_name: 'Growth',
  billing_period: 'annual' | 'monthly'
}
```

---

#### 65. `wizard_talk_to_sales_clicked`
**Trigger:** User clicks "Talk to Sales" (Enterprise)

**Properties:**
```javascript
{
  timestamp: Date,
  plan_id: 'enterprise',
  plan_name: 'Enterprise',
  is_migration_user: boolean
}
```

---

#### 66. `wizard_see_details_clicked`
**Trigger:** User clicks "See details" link (pricing page)

**Properties:**
```javascript
{
  timestamp: Date,
  plan_id: string,
  plan_name: string
}
```

---

#### 67. `wizard_plan_selected`
**Trigger:** User selects a plan (clicks trial/waitlist button)

**Properties:**
```javascript
{
  timestamp: Date,
  selected_plan: 'starter' | 'growth' | 'enterprise',
  plan_name: string,
  billing_period: 'annual' | 'monthly',
  is_recommended_plan: boolean,
  price: string,
  monthly_price?: string,
  annual_savings_percent?: number,
  cta_type: 'trial' | 'waitlist' | 'talk_to_sales', // which CTA was clicked
  plan_version: 'softlaunch' | 'main',
  time_spent_on_step: number
}
```

---

#### 68. `wizard_onboarding_api_started`
**Trigger:** API call to complete onboarding starts

**Properties:**
```javascript
{
  timestamp: Date,
  selected_plan: string,
  billing_period: 'annual' | 'monthly'
}
```

---

#### 69. `wizard_onboarding_api_completed`
**Trigger:** API call completes (success or error)

**Properties:**
```javascript
{
  timestamp: Date,
  success: boolean,
  error_message?: string,
  error_code?: string,
  api_response_time: number // milliseconds
}
```

---

#### 70. `wizard_trial_success_viewed`
**Trigger:** Trial success page is displayed

**Properties:**
```javascript
{
  timestamp: Date,
  selected_plan: string,
  animation_played: boolean,
  plan_version: 'softlaunch' | 'main'
}
```

---

#### 71. `wizard_completed`
**Trigger:** Entire wizard flow completes and user is redirected

**Properties:**
```javascript
{
  timestamp: Date,
  total_wizard_time: number, // seconds from wizard_started
  total_signup_time: number, // seconds from signup_started
  selected_plan: 'starter' | 'growth' | 'enterprise',
  community_name: string,
  objectives_count: number,
  has_logo: boolean,
  logo_source: string,
  primary_color: string,
  spaces_count: number,
  billing_period: 'annual' | 'monthly',
  was_migration: boolean,
  used_brandfetch: boolean,
  plan_version: 'softlaunch' | 'main',
  redirect_to: string
}
```

---

## Error & Exit Events

### **Error Events**

#### 72. `signup_error_occurred`
**Trigger:** Error occurs during signup

**Properties:**
```javascript
{
  timestamp: Date,
  error_type: string,
  error_message: string,
  error_code?: string,
  step_name: string,
  step_number: number, // 1-6
  field_name?: string // if error is related to specific field
}
```

---

#### 73. `wizard_error_occurred`
**Trigger:** Error occurs during wizard

**Properties:**
```javascript
{
  timestamp: Date,
  error_type: string,
  error_message: string,
  error_code?: string,
  step_name: string,
  step_number: number // 1-4
}
```

---

### **Abandonment Events**

#### 74. `signup_abandoned`
**Trigger:** User abandons signup (closes tab, navigates away)

**Properties:**
```javascript
{
  timestamp: Date,
  last_step_name: string,
  last_step_number: number,
  time_spent_total: number, // seconds from signup_started
  completed_steps_count: number,
  exit_method: 'tab_close' | 'navigation' | 'timeout' | 'back_button'
}
```

---

#### 75. `wizard_abandoned`
**Trigger:** User abandons wizard (closes tab, navigates away)

**Properties:**
```javascript
{
  timestamp: Date,
  last_step_name: string,
  last_step_number: number,
  time_spent_in_wizard: number, // seconds from wizard_started
  completed_wizard_steps_count: number,
  was_migration_flow: boolean
}
```

---

### **Navigation Events**

#### 76. `signup_back_button_clicked`
**Trigger:** User clicks Back button in signup

**Properties:**
```javascript
{
  timestamp: Date,
  from_step: string,
  from_step_number: number,
  to_step: string,
  to_step_number: number
}
```

---

#### 77. `wizard_back_button_clicked`
**Trigger:** User clicks Back button in wizard

**Properties:**
```javascript
{
  timestamp: Date,
  from_step: string,
  from_step_number: number,
  to_step: string,
  to_step_number: number
}
```

---

---

## 🔍 Event Properties Reference

### Common Properties (Included in All Events)

These properties are automatically added to all events:

```javascript
{
  // User Identification
  user_id?: string, // if user is authenticated
  anonymous_id: string, // for tracking before signup completion
  session_id: string,
  
  // Device & Browser
  device_type: 'mobile' | 'tablet' | 'desktop',
  browser: string,
  browser_version: string,
  os: string,
  os_version: string,
  screen_resolution: string,
  viewport_size: string,
  
  // Location
  country?: string,
  city?: string,
  timezone: string,
  language: string,
  
  // UTM Parameters (Marketing Attribution)
  utm_source?: string,
  utm_medium?: string,
  utm_campaign?: string,
  utm_term?: string,
  utm_content?: string,
  
  // Page Info
  page_url: string,
  page_title: string,
  referrer?: string,
  
  // Timing
  timestamp: Date,
  local_time: string,
  
  // App Version
  app_version: string,
  
  // Experiment/Variant Info
  ab_test_variant?: string,
  feature_flags?: object
}
```

---

## 📊 Priority Events Summary

### **Must-Have Events (Phase 1)** - 25 Events

#### Authentication (5 events)
1. `signup_started`
2. `signup_email_entered`
3. `signup_otp_requested`
4. `signup_otp_entered`
5. `signup_existing_user_redirected`

#### Main Signup Flow (13 events)
6. `signup_step_viewed`
7. `signup_name_entered`
8. `signup_brand_data_fetched`
9. `signup_industry_preselected`
10. `signup_industry_selected`
11. `signup_role_selected`
12. `signup_integrations_submitted`
13. `signup_enterprise_question_viewed`
14. `signup_enterprise_features_submitted` (if Yes clicked)
15. `signup_community_creation_method_selected`
16. `signup_community_name_submitted`
17. `signup_migration_submitted` (if migrate)
18. `signup_completed`

#### Wizard (7 events)
19. `wizard_started`
20. `wizard_step_viewed`
21. `wizard_objectives_submitted`
22. `wizard_branding_submitted`
23. `wizard_spaces_submitted`
24. `wizard_plan_selected`
25. `wizard_completed`

#### Errors (4 events)
26. `signup_error_occurred`
27. `wizard_error_occurred`
28. `signup_abandoned`
29. `wizard_abandoned`

---

## 🎯 Key Conversion Metrics

### Main Funnel
- **Signup Started → Email Entered:** __%
- **Email Entered → OTP Verified:** __% (OTP success rate)
- **OTP Verified → Basic Info:** __%
- **Basic Info → Industry:** __%
- **Industry → Role:** __%
- **Role → Integrations:** __%
- **Integrations → Enterprise Q:** __%
- **Enterprise Q → Community Name:** __%
- **Community Name → Signup Complete:** __%
- **Overall Signup Conversion:** __%

### Wizard Funnel
- **Wizard Started → Objectives:** __%
- **Objectives → Branding:** __%
- **Branding → Spaces:** __%
- **Spaces → Plan Selection:** __%
- **Plan Selection → Complete:** __%
- **Overall Wizard Conversion:** __%

### End-to-End
- **Signup Started → Wizard Completed:** __% (complete funnel conversion)

---

## 📈 Feature Adoption Metrics

### Auto-Detection
- **Industry Auto-Detect Success Rate:** __% (preselected / total)
- **Industry Suggestion Acceptance Rate:** __% (accepted / preselected)
- **Brandfetch Success Rate:** __% (fetched / work emails)
- **Logo Usage from Brandfetch:** __% (used / available)
- **Color Usage from Brandfetch:** __% (used / available)

### Integrations
- **Users Selecting Integrations:** __% (selected > 0 / total)
- **Average Integrations per User:** __
- **Starter Integrations Average:** __ (max 6)
- **Growth/Enterprise Integrations Average:** __ 
- **Select All Usage Rate:** __% (clicked select all / total)
- **Skip Rate:** __% (skipped / total)

### Enterprise Features
- **Enterprise Interest Rate:** __% (clicked Yes / total)
- **Enterprise Features Selected:** __% (selected > 0 / clicked Yes)
- **Average Features per User:** __ (for those who clicked Yes)
- **Select All Usage Rate:** __% (select all / clicked Yes)

### Community Type
- **New Community Rate:** __% (create new / total)
- **Migration Rate:** __% (migrate / total)

### Wizard Features
- **Average Objectives Selected:** __
- **Average Spaces Selected:** __
- **Logo Upload Rate:** __% (uploaded / total)
- **Custom Branding Rate:** __% (changed color or logo / total)

### Plan Selection
- **Recommended Plan Acceptance:** __% (selected recommended / total)
- **Annual vs Monthly:** Annual __% vs Monthly __%
- **Plan Distribution:**
  - Starter: __%
  - Growth: __%
  - Enterprise: __%

---

## 📌 Final Notes

### Total Events: 77
- Authentication: 7 events
- Main Signup Flow: 31 events (including enterprise features)
- Wizard: 33 events
- Errors & Navigation: 6 events

### Total Form Fields: 18
- Authentication: 2
- Main Signup: 10
- Wizard: 6

### Total Steps: 10
- Authentication: 1
- Main Signup: 6
- Wizard: 4

---

**Last Updated:** December 11, 2025  
**Version:** 2.0  
**Prepared by:** Product Design Team  
**For:** Marketing, Analytics, Engineering Teams

---

