interface Props {
  message: string;
}

export const ErrorWidget = ({ message }: Props) => (
  <section>
    <header>
      <h3>Error</h3>
    </header>

    <main>
      <p>Could not load application data</p>
      <p>{message}</p>
    </main>
  </section>
);
