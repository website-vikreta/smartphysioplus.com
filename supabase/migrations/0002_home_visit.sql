-- Home visits (promptP2.md section 9). Same write-only table, same RLS (no policies).
-- Adds the home_visit concern and an address that is filled only for that concern.
alter table appointment_requests drop constraint if exists appointment_requests_concern_check;
alter table appointment_requests add constraint appointment_requests_concern_check
  check (concern in ('cervical','thoracic','lumbar','sacral','joints','not_sure','home_visit'));
alter table appointment_requests add column if not exists home_address text
  check (home_address is null or char_length(home_address) <= 300);
-- Retention is unchanged: delete requests, including addresses, after 12 months.
