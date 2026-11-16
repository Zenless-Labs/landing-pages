'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Arrow } from './studio-components';
import { galleryFilters, galleryItems } from './gallery-items';

type Filter = (typeof galleryFilters)[number];

export default function ObjectGallery() {
  const [filter, setFilter] = useState<Filter>('All possibilities');
  const [positions, setPositions] = useState<Partial<Record<Filter, number>>>(
    {},
  );
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const shown = galleryItems.filter(
    (item) => filter === 'All possibilities' || item.category === filter,
  );
  const index = (positions[filter] ?? 0) % shown.length;
  const item = shown[index];

  function select(next: number) {
    setPositions((current) => ({
      ...current,
      [filter]: (next + shown.length) % shown.length,
    }));
  }

  function move(direction: number) {
    setPositions((current) => ({
      ...current,
      [filter]:
        ((current[filter] ?? 0) + direction + shown.length) % shown.length,
    }));
  }

  return (
    <>
      <div className="gallery-toolbar">
        <div
          className="gallery-filters"
          role="group"
          aria-label="Filter by making process"
        >
          {galleryFilters.map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <span className="micro gallery-toolbar-note">
          YOUR IDEA SETS THE DIRECTION.
        </span>
      </div>
      <section
        className="inspiration-gallery"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${filter} inspiration`}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        <div className="gallery-feature">
          <div
            className="gallery-stage"
            onTouchStart={(event) => {
              const touch = event.touches[0];
              touchStart.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchEnd={(event) => {
              const start = touchStart.current;
              touchStart.current = null;
              if (!start) return;
              const touch = event.changedTouches[0];
              const dx = touch.clientX - start.x;
              const dy = touch.clientY - start.y;
              if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
                move(dx < 0 ? 1 : -1);
            }}
          >
            <button
              type="button"
              className="gallery-enlarge"
              onClick={() => dialog.current?.showModal()}
              aria-label={`Enlarge ${item.title}`}
            >
              <Image
                key={item.image}
                src={`/images/${item.image}.webp`}
                alt={item.alt}
                width={1536}
                height={1024}
                sizes="(max-width: 800px) 100vw, 60vw"
              />
              <span className="gallery-zoom" aria-hidden="true">
                ↗
              </span>
            </button>
            <button
              type="button"
              className="gallery-direction gallery-previous"
              aria-label="Previous example"
              onClick={() => move(-1)}
            >
              <Arrow />
            </button>
            <button
              type="button"
              className="gallery-direction gallery-next"
              aria-label="Next example"
              onClick={() => move(1)}
            >
              <Arrow />
            </button>
          </div>
          <div className="gallery-copy" aria-live="polite" aria-atomic="true">
            <div className="gallery-item-meta micro">
              <span>{item.type}</span>
              <span>
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(shown.length).padStart(2, '0')}
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="object-note">{item.note}</span>
            <span className="gallery-browse-hint micro">
              A starting point for your own idea.
            </span>
          </div>
        </div>
        <div
          className="gallery-thumbnails"
          role="group"
          aria-label="Choose an example"
        >
          {shown.map((example, i) => (
            <button
              type="button"
              key={example.id}
              aria-label={`Show ${example.title}`}
              aria-pressed={i === index}
              onClick={() => select(i)}
            >
              <Image
                src={`/images/${example.image}.webp`}
                alt=""
                width={144}
                height={96}
                sizes="112px"
              />
              <span>{example.type}</span>
            </button>
          ))}
        </div>
        <dialog
          ref={dialog}
          className="gallery-dialog"
          aria-label="Expanded gallery image"
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <div className="gallery-dialog-content">
            <button
              type="button"
              className="gallery-close"
              aria-label="Close expanded image"
              onClick={() => dialog.current?.close()}
              autoFocus
            >
              Close <span aria-hidden="true">×</span>
            </button>
            <Image
              src={`/images/${item.image}.webp`}
              alt={item.alt}
              width={1536}
              height={1024}
              sizes="90vw"
            />
            <div className="gallery-dialog-bottom">
              <button
                type="button"
                aria-label="Previous expanded example"
                onClick={() => move(-1)}
              >
                ← Previous
              </button>
              <p aria-live="polite">
                {item.title}{' '}
                <span>
                  {index + 1} / {shown.length}
                </span>
              </p>
              <button
                type="button"
                aria-label="Next expanded example"
                onClick={() => move(1)}
              >
                Next →
              </button>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
}
