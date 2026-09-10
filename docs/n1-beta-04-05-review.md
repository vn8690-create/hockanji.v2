# N1 Beta 04–05 — content and release review

Added on 2026-09-10 to the existing GitHub Pages app. These are original practice exams, not official JLPT papers or independently calibrated exams. The earlier six supplied N1 PDFs remain the structural reference; targeted visual-reference notes are in `n1-beta-02-03-review.md`. This release does not claim a fresh page-by-page transcription of those PDFs.

Each exam has 68 questions, 13 sections, 110 minutes, and no listening. Quotas are 6/7/6/6/10/5/4/4/9/3/2/4/2: vocabulary 25, grammar 19, reading 24. Each has its own text-grammar passage and eleven reading groups. Questions stay attached to passages; only answer options shuffle. Japanese prompts and options, Vietnamese explanations after completion, and existing pause/resume behavior are preserved.

## Reading scope

- Beta 04: probability and decisions, naming and observation, musical silence, recommendations; expert diagnosis, street lighting, apparent agreement; adaptive reuse of a station; anonymous questions; tools and checking their output; workshop bookings.
- Beta 05: schedule margins, origin labels, revision, everyday maintenance; survey scope, film interpretation, participation burdens; museum interpretation; meeting records; eliciting and responding to user feedback; research grants.
- Short passages: 197–221 characters, medium: 602–657, long comprehension: 963/1,003, paired viewpoints: 679/583, argument: 1,072/1,127. Counts include punctuation and line breaks. Length is an editorial check, not a claim of measured JLPT difficulty.
- No identical passages or exact vocabulary/grammar question stems across the five banks. Concepts and general question forms may recur.

## Answer review

Reviewed the intended grammar completions, full reconstructed ★ sentences, reading evidence, and information-search calculations. Replaced a ★ item that admitted another word order. Clarified the honorific speaker as the company's representative addressing a customer. Removed ambiguous grammar choices and some overly obvious distractors.

- Beta 04 Q67: course B is the latest eligible course; C ends after the booking deadline and bookings open the following day.
- Beta 04 Q68: 800 × 2 − 200 + 300 = 1,700 yen.
- Beta 05 Q67: first-time consultation by November 15, documents received by November 20 at 17:00; nonresident members are allowed.
- Beta 05 Q68: (12,000 + 4,000 + 8,000) × 3/4 = 18,000 yen; travel excluded.

## Functional validation

The actual app state tests passed for Beta 01, 04 and 05: quotas, answer shuffling, selected bank, passage grouping, changing answers before advancing, pause/reload/resume, grading, wrong-answer notebook, explanation gating, expiry, and N4 selector behavior. All five banks produce 340 distinct question IDs. JavaScript syntax and whitespace checks passed. Browser/device visual QA and independent Japanese-language review were not performed.

The two new banks are fetched only when selected; they are not added to the initial page payload. Existing exams and saved question IDs are preserved.
