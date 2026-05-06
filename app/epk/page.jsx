"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COVERS = [
  { song: "WITH YOU", artist: "CHRIS BROWN", views: "1.24M", uploaded: "JAN 2008" },
  { song: "CRY ME A RIVER", artist: "JUSTIN TIMBERLAKE", views: "986K", uploaded: "DEC 2007" },
  { song: "U GOT IT BAD", artist: "USHER", views: "742K", uploaded: "FEB 2008" },
  { song: "RESPECT", artist: "ARETHA FRANKLIN", views: "418K", uploaded: "OCT 2007" },
  { song: "SET A PLACE AT YOUR TABLE", artist: "MATT BRouwer", views: "302K", uploaded: "AUG 2007" },
  { song: "REFINE ME [ORIGINAL]", artist: "—", views: "187K", uploaded: "MAR 2008" },
];

const DEMOGRAPHICS = [
  { label: "FEMALE 13–17", pct: 52 },
  { label: "FEMALE 18–24", pct: 26 },
  { label: "MALE 13–17", pct: 9 },
  { label: "FEMALE 25–34", pct: 7 },
  { label: "MALE 18–24", pct: 4 },
  { label: "OTHER", pct: 2 },
];

const GEO = [
  { label: "UNITED STATES", pct: 42 },
  { label: "UNITED KINGDOM", pct: 18 },
  { label: "CANADA", pct: 12 },
  { label: "AUSTRALIA", pct: 7 },
  { label: "GERMANY", pct: 5 },
  { label: "REST OF WORLD", pct: 16 },
];

const QUOTES = [
  {
    body: "I clicked the wrong YouTube video. Then I watched the kid sing 'Respect' a cappella in his living room. Forty-eight hours later I had a flight booked to Stratford.",
    by: "SCOOTER BRAUN, FOUNDER · SB PROJECTS / RBMG",
  },
  {
    body: "I've watched a lot of vocal demos. This one is the one. The tone is already there — what he needs is a record.",
    by: "USHER RAYMOND IV · CO-OWNER · RBMG",
  },
  {
    body: "We've never seen audience velocity like this off a single platform. The conversion to fan-action is unusual — comments, requests, repeat views.",
    by: "INTERNAL MEMO · RBMG · NOV 2008",
  },
];

function Stat({ value, label }) {
  return (
    <div
      style={{
        border: "1px solid #1a1a1a",
        padding: "10px 12px",
        background: "rgba(255,255,255,0.18)",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          opacity: 0.7,
          marginBottom: "2px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Times New Roman', Georgia, serif",
          fontSize: "26px",
          lineHeight: 1.05,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Bar({ label, pct }) {
  return (
    <div className="epk-bar-row">
      <span className="epk-bar-label">{label}</span>
      <span className="epk-bar-track">
        <span className="epk-bar-fill" style={{ width: pct + "%" }} />
      </span>
      <span className="epk-bar-pct">{pct}%</span>
    </div>
  );
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function EPK() {
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="page">
      <div id="epk-app">
        <header className="epk-header">
          <div>
            <div className="epk-brand">RBMG · ELECTRONIC PRESS KIT</div>
            <div className="epk-brand-sub">
              CONFIDENTIAL DRAFT &nbsp;//&nbsp; PROSPECTIVE LABEL · APR RECORDS
              &nbsp;//&nbsp; PREPARED LATE 2008
            </div>
          </div>
          <div className="epk-status">
            <div>{"> READY"}</div>
            <div>{clock}</div>
          </div>
        </header>
        <hr className="epk-rule" />

        <section className="epk-hero">
          <div className="epk-hero-photo">
            <img src="/bieber-kid.avif" alt="Justin Bieber, age 14" />
            <div className="epk-photo-caption">FIG. 01 — UNSIGNED · STRATFORD, ON · 2008</div>
          </div>
          <div className="epk-hero-body">
            <div className="epk-tag">{"> ARTIST"}</div>
            <h1 className="epk-name">JUSTIN BIEBER</h1>
            <div className="epk-tagline">
              VOCALIST &nbsp;·&nbsp; STRATFORD, ON &nbsp;·&nbsp; B. 1994
              &nbsp;·&nbsp; UNSIGNED
            </div>
            <div className="epk-stat-grid">
              <Stat value="85.2K" label="YOUTUBE SUBS" />
              <Stat value="10.4M" label="LIFETIME VIEWS" />
              <Stat value="78%" label="FEMALE AUDIENCE" />
              <Stat value="2:42" label="AVG WATCH (mm:ss)" />
            </div>
            <div className="epk-pitch">
              An unsigned 14-year-old vocalist with a pre-validated global
              audience, a verified-by-data fan-conversion rate, and active
              management. He has not been on radio. He has not done Disney.
              The audience came to him.
            </div>
          </div>
        </section>

        <hr className="epk-rule" />

        <section className="epk-section">
          <div className="epk-section-label">[01] BIO</div>
          <div className="epk-prose">
            <p>
              Justin Drew Bieber was born March 1, 1994 in Stratford, Ontario
              — a town of roughly 30,000. Self-taught on drums (age 2), piano
              (age 6), guitar and trumpet (age 7). Placed second at the
              Stratford Star talent competition in 2007, age 12.
            </p>
            <p>
              His mother began uploading short performance videos to a
              YouTube channel ("kidrauhl") so out-of-town family could watch.
              The videos kept their native form: a kid in his living room
              with a rented guitar, no production. The channel began
              attracting traffic well outside the family circle within
              months.
            </p>
            <p>
              In January 2008, talent manager Scooter Braun discovered the
              channel by accident — clicked the wrong link, stayed for the
              vocal. He flew Bieber and his mother to Atlanta, where Bieber
              met Usher Raymond IV. The result: a joint management entity,
              <strong> Raymond Braun Media Group (RBMG)</strong>, founded
              October 2008. He has not yet signed a label deal.
            </p>
            <p>
              The window we are pitching exists because that fact is still
              true.
            </p>
          </div>
        </section>

        <hr className="epk-rule" />

        <section className="epk-section">
          <div className="epk-section-label">[02] REPERTOIRE — VIRAL COVERS</div>
          <table className="epk-table">
            <thead>
              <tr>
                <th>SONG</th>
                <th>ORIGINAL ARTIST</th>
                <th>VIEWS</th>
                <th>UPLOADED</th>
              </tr>
            </thead>
            <tbody>
              {COVERS.map((c) => (
                <tr key={c.song}>
                  <td>{c.song}</td>
                  <td className="epk-dim">{c.artist}</td>
                  <td>{c.views}</td>
                  <td className="epk-dim">{c.uploaded}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="epk-note">
            * Vocal range: ~G2–G5 (chest), F#5 (mix). Native R&B/pop
            sensibility. Comp: early-period Justin Timberlake, age-adjusted.
          </div>
        </section>

        <hr className="epk-rule" />

        <section className="epk-section">
          <div className="epk-section-label">[03] AUDIENCE — DEMOGRAPHIC SPLIT</div>
          <div className="epk-bars">
            {DEMOGRAPHICS.map((d) => (
              <Bar key={d.label} label={d.label} pct={d.pct} />
            ))}
          </div>
        </section>

        <hr className="epk-rule" />

        <section className="epk-section">
          <div className="epk-section-label">[04] AUDIENCE — GEOGRAPHIC DISTRIBUTION</div>
          <div className="epk-bars">
            {GEO.map((g) => (
              <Bar key={g.label} label={g.label} pct={g.pct} />
            ))}
          </div>
          <div className="epk-note">
            * Tour-routing implication: existing demand outside North America.
            UK and Australia are pre-validated for first-cycle touring.
          </div>
        </section>

        <hr className="epk-rule" />

        <section className="epk-section">
          <div className="epk-section-label">[05] PRESS / EARLY VALIDATION</div>
          <div className="epk-quotes">
            {QUOTES.map((q, i) => (
              <blockquote key={i} className="epk-quote">
                <div className="epk-quote-body">"{q.body}"</div>
                <div className="epk-quote-by">— {q.by}</div>
              </blockquote>
            ))}
          </div>
          <div className="epk-note">
            * Outside interest noted: Justin Timberlake / Tennman Records is
            also pursuing. Window for first-mover acquisition is closing.
          </div>
        </section>

        <hr className="epk-rule" />

        <section className="epk-section">
          <div className="epk-section-label">[06] THE ASK</div>
          <div className="epk-ask">
            <div className="epk-ask-row">
              <span className="epk-ask-key">DEAL STRUCTURE</span>
              <span className="epk-ask-val">
                360 JOINT VENTURE · APR RECORDS × RBMG · 50/50 PROFIT SPLIT
              </span>
            </div>
            <div className="epk-ask-row">
              <span className="epk-ask-key">ROLES</span>
              <span className="epk-ask-val">
                APR: DISTRIBUTION · MARKETING · TOUR SUPPORT &nbsp;·&nbsp;
                RBMG: MANAGEMENT &nbsp;·&nbsp; USHER: ARTISTIC MENTORSHIP
              </span>
            </div>
            <div className="epk-ask-row">
              <span className="epk-ask-key">RELEASE TIMELINE</span>
              <span className="epk-ask-val">
                EP Q3 2009 → DEBUT LP Q4 2009 → FIRST CYCLE TOUR 2010
              </span>
            </div>
            <div className="epk-ask-row">
              <span className="epk-ask-key">CAPITAL DEPLOYMENT</span>
              <span className="epk-ask-val">
                STAGED · TIED TO MILESTONES · TRANCHED RISK
              </span>
            </div>
          </div>
          <div className="epk-pull">
            "The question isn't whether Justin Bieber becomes a star. The
            question is whether he becomes our star — or someone else's."
          </div>
        </section>

        <hr className="epk-rule" />

        <section className="epk-section epk-contact">
          <div className="epk-section-label">[07] CONTACT</div>
          <div className="epk-contact-grid">
            <div>
              <div className="epk-contact-key">MANAGEMENT</div>
              <div>SCOOTER BRAUN</div>
              <div className="epk-dim">FOUNDER · SB PROJECTS / RBMG</div>
              <div className="epk-dim">scooter@rbmg.example</div>
            </div>
            <div>
              <div className="epk-contact-key">ARTIST DEVELOPMENT</div>
              <div>USHER RAYMOND IV</div>
              <div className="epk-dim">CO-OWNER · RBMG</div>
              <div className="epk-dim">usher@rbmg.example</div>
            </div>
            <div>
              <div className="epk-contact-key">BOOKING / LABEL</div>
              <div>RBMG LABEL DESK</div>
              <div className="epk-dim">label@rbmg.example</div>
              <div className="epk-dim">+1 ███ ███ ████</div>
            </div>
          </div>
        </section>

        <div className="epk-footer">
          <Link href="/" className="epk-back">
            ← BACK TO INDUSTRY ANALYSIS
          </Link>
          <span className="epk-dim">
            * UNAUDITED INTERNAL FIGURES &nbsp;&nbsp; * RBMG INTERNAL — NOT
            FOR DISTRIBUTION
          </span>
        </div>
      </div>
    </main>
  );
}
