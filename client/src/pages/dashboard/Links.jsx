import { useEffect, useState } from "react";

import SearchBar from "../../components/dashboard/links/SearchBar";
import LinksTable from "../../components/dashboard/links/LinksTable";
import Pagination from "../../components/dashboard/links/Pagination";
import QRModal from "../../components/dashboard/links/QRModal";

import {
  getLinks,
  generateQRCode,
} from "../../services/link.service";

const LIMIT = 10;

function Links() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] =
    useState(1);

  const [selectedQR, setSelectedQR] =
    useState(null);

  useEffect(() => {
    fetchLinks();
  }, [page]);

  const fetchLinks = async () => {
    try {
      setLoading(true);

      const response = await getLinks(
        page,
        LIMIT
      );

      setLinks(response.data);

      setTotalPages(
        response.pagination.totalPages
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
     finally {
      setLoading(false);
    }
  };

  const handleShowQR = async (link) => {
    try {
      const response =
        await generateQRCode(link.id);

      setSelectedQR({
        ...link,
        qrCode: response.data.qrCode,
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">
          My Links
        </h1>

        <p className="mt-1 text-slate-500">
          Manage all your shortened links.
        </p>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <LinksTable
        links={links}
        search={search}
        loading={loading}
        onShowQR={handleShowQR}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <QRModal
        open={!!selectedQR}
        link={selectedQR}
        onClose={() =>
          setSelectedQR(null)
        }
      />
    </div>
  );
}

export default Links;