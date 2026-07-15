import EmptyState from "./EmptyState";
import LinkRow from "./LinkRow";

function LinksTable({
  links,
  search,
  loading,
  onShowQR,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        Loading...
      </div>
    );
  }

  const filtered = links.filter((link) => {
    const query = search.toLowerCase();

    return (
      link.alias
        ?.toLowerCase()
        .includes(query) ||
      link.originalUrl
        .toLowerCase()
        .includes(query)
    );
  });

  if (!filtered.length) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">

      {filtered.map((link) => (
        <LinkRow
          key={link.id}
          link={link}
          onShowQR={onShowQR}
        />
      ))}

    </div>
  );
}

export default LinksTable;