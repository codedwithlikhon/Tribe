import { type ReactNode } from 'react';

interface SurfaceDefinition {
  name: string;
  description: string;
  className: string;
  example: ReactNode;
}

interface SurfaceCategory {
  title: string;
  subtitle: string;
  surfaces: SurfaceDefinition[];
}

const surfaceCategories: SurfaceCategory[] = [
  {
    title: 'Surface',
    subtitle: 'On the page.',
    surfaces: [
      {
        name: 'Material Base',
        description: 'Everyday use. Radius 6px.',
        className: 'material-base',
        example: 'Material Base\nTransparent max W [240px] h [100px]',
      },
      {
        name: 'Material Small',
        description: 'Slightly raised. Radius 6px.',
        className: 'material-small',
        example: 'Material Small\nTransparent max W [240px] h [100px]',
      },
      {
        name: 'Material Medium',
        description: 'Further raised. Radius 12px.',
        className: 'material-medium',
        example: 'Material Medium\nTransparent max W [240px] h [100px]',
      },
      {
        name: 'Material Large',
        description: 'Further raised. Radius 12px.',
        className: 'material-large',
        example: 'Material Large\nTransparent max W [240px] h [100px]',
      },
    ],
  },
  {
    title: 'Floating',
    subtitle: 'Above the page.',
    surfaces: [
      {
        name: 'Material Tooltip',
        description: 'Lightest shadow. Corner 6px. Tooltips will be the only floating element with a triangular stem.',
        className: 'material-tooltip',
        example: 'Material Tooltip\nTransparent max W [240px] h [100px]',
      },
      {
        name: 'Material Menu',
        description: 'Lift from page. Radius 12px.',
        className: 'material-menu',
        example: 'Material Menu\nTransparent max W [240px] h [100px]',
      },
      {
        name: 'Material Modal',
        description: 'Further lift. Radius 12px.',
        className: 'material-modal',
        example: 'Material Modal\nTransparent max W [240px] h [100px]',
      },
      {
        name: 'Material Fullscreen',
        description: 'Biggest lift. Radius 16px.',
        className: 'material-fullscreen',
        example: 'Material Fullscreen\nTransparent max W [240px] h [100px]',
      },
    ],
  },
];

function formatExample(example: string): ReactNode {
  const lines = example.split('\n');
  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

export function SurfaceShowcase(): JSX.Element {
  return (
    <section className="landing-surfaces" aria-labelledby="surface-heading">
      <header>
        <span className="landing-eyebrow">Surface tokens</span>
        <h2 id="surface-heading">Material elevations for every context</h2>
        <p>
          Choose the elevation style that matches the intent of your element. These presets balance depth, accessibility, and
          clarity for tooltips, menus, modals, and application chrome.
        </p>
      </header>

      <div className="material-surface-grid">
        {surfaceCategories.map((category) => (
          <article key={category.title} className="material-surface-category">
            <div>
              <h3>{category.title}</h3>
              <p>{category.subtitle}</p>
            </div>
            <div className="material-surface-table-wrapper">
              <table className="material-surface-table">
                <thead>
                  <tr>
                    <th scope="col">Example</th>
                    <th scope="col">Class name</th>
                    <th scope="col">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {category.surfaces.map((surface) => (
                    <tr key={surface.name}>
                      <td>
                        <div className={`material-surface-preview ${surface.className}`}>
                          {formatExample(surface.example)}
                        </div>
                      </td>
                      <td>
                        <span className="material-class-badge">.{surface.className}</span>
                      </td>
                      <td className="material-surface-usage">{surface.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
