'use client';
import Link from 'next/link';
import css from './page.module.css';


export default function HomePage() {
  return (
    <div className={css.wrapper}>
      <main className={css.main}>
        <section className={css.hero}>
          <h1 className={css.title}>
            Welcome to <span className={css.accent}>NoteHub</span>
          </h1>
          <p className={css.description}>
            Your personal space for capturing ideas and staying organized.
          </p>
          <div className={css.cta}>
            <Link href="/notes" className={css.mainButton}>
              Go to My Notes
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}