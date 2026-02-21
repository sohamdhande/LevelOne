-- 1. Total Page Views
SELECT count(*) as total_page_views
FROM events
WHERE event_type = 'page_view' AND metadata->>'page_id' = 'landing_v1';

-- 2. CTA Click Rate
-- Percentage of unique visitors (by ip_hash) who triggered a page_view that also clicked a CTA
SELECT 
  ROUND(
    (SELECT count(DISTINCT ip_hash) FROM events WHERE event_type = 'cta_click' AND metadata->>'page_id' = 'landing_v1') * 100.0 / 
    NULLIF((SELECT count(DISTINCT ip_hash) FROM events WHERE event_type = 'page_view' AND metadata->>'page_id' = 'landing_v1'), 0), 2
  ) as cta_click_rate_pct;

-- 3. Form Open Rate
-- Percentage of unique CTA clicks that successfully opened the form modal
SELECT 
  ROUND(
    (SELECT count(DISTINCT ip_hash) FROM events WHERE event_type = 'form_open' AND metadata->>'page_id' = 'landing_v1') * 100.0 / 
    NULLIF((SELECT count(DISTINCT ip_hash) FROM events WHERE event_type = 'cta_click' AND metadata->>'page_id' = 'landing_v1'), 0), 2
  ) as form_open_rate_pct;

-- 4. Submission Rate
-- Percentage of unique form openers who successfully completed a valid submission
SELECT 
  ROUND(
    (SELECT count(DISTINCT ip_hash) FROM events WHERE event_type = 'form_submit' AND metadata->>'page_id' = 'landing_v1') * 100.0 / 
    NULLIF((SELECT count(DISTINCT ip_hash) FROM events WHERE event_type = 'form_open' AND metadata->>'page_id' = 'landing_v1'), 0), 2
  ) as form_submission_rate_pct;

-- 5. % Yes (Section Vote)
SELECT 
  ROUND(
    (SELECT count(*) FROM events WHERE event_type = 'price_vote_section' AND metadata->>'choice' = 'yes' AND metadata->>'page_id' = 'landing_v1') * 100.0 / 
    NULLIF((SELECT count(*) FROM events WHERE event_type = 'price_vote_section' AND metadata->>'page_id' = 'landing_v1'), 0), 2
  ) as section_yes_vote_pct;

-- 6. % Yes (Form Vote)
-- (Submissions don't have page_id directly, applying to all submissions for now. 
-- Alternatively, we can join with events on ip_hash for strict page_id segmentation if needed)
SELECT 
  ROUND(
    (SELECT count(*) FROM submissions WHERE price_vote_form = 'yes') * 100.0 / 
    NULLIF((SELECT count(*) FROM submissions WHERE price_vote_form IS NOT NULL), 0), 2
  ) as form_yes_vote_pct;
