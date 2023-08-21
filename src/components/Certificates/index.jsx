import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Col, Row, Form, ButtonGroup, Alert } from "react-bootstrap";
import {
  getCertificates,
  getCertificatesWithFilter,
} from "../api/certificates/api";
import LimitDropdown from "./components/LimitDropDown";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import ViewModal from "./components/ViewModal";
import EditModal from "./components/EditModal";
import { getAccessToken } from "../util/jwt";
import styles from "./styles/certificates.module.css";
import DeleteModal from "./components/DeleteModal";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Certificates = () => {
  const [giftCertificates, setGiftCertificates] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalObj, setTotalObj] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDone, setSearchDone] = useState("");
  const [error, setError] = useState(false);

  const handleShowViewModal = (certificate) => {
    setSelectedCertificate(certificate);
    setShowViewModal(true);
  };

  const handleShowEditModal = (certificate) => {
    setSelectedCertificate(certificate);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (certificate) => {
    setSelectedCertificate(certificate);
    setShowDeleteModal(true);
  };

  const handleSearch = async () => {
    setSearchDone(true);
    const searchQueryParts = searchQuery.split(" ");
    const nonEmptyParts = searchQueryParts.filter((part) => part !== "");

    const { keywords, tags } = nonEmptyParts.reduce(
      (result, part) => {
        if (part.startsWith("#(") && part.endsWith(")")) {
          const tag = part.substring(2, part.length - 1);
          result.tags.push(tag);
        } else {
          result.keywords.push(part);
        }
        return result;
      },
      { keywords: [], tags: [] }
    );

    const queryParams = [];
    if (keywords.length > 0) {
      queryParams.push(`partOfNameDescription=${keywords.join(" ")}`);
    }

    tags.forEach((tag) => {
      queryParams.push(`tags=${tag}`);
    });

    const urlWithParams = `gift-certificate-system/giftCertificates/search?${queryParams.join(
      "&"
    )}`;

    try {
      const data = await getCertificatesWithFilter(
        urlWithParams,
        currentPage,
        limit
      );

      setGiftCertificates(data.giftCertificates.content);
      setTotalObj(data.total);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCertificates = async (page, limit) => {
    try {
      const data = await getCertificates(page, limit, getAccessToken());
      setGiftCertificates(data.giftCertificates.content);
      setTotalObj(data.total);
      setTotalPages(Math.ceil(data.total / limit));
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    if (!searchDone) fetchCertificates(currentPage, limit);
    else handleSearch();
  }, [currentPage, limit]);

  return (
    <>
      <HelmetProvider>
        <div className={styles.certificatesContainer}>
          <Helmet>
            <title>Certificates</title>
          </Helmet>

          <LimitDropdown limit={limit} setLimit={setLimit} />
          <Form.Group
            controlId="searchForm"
            className="mb-2"
            style={{ zIndex: 1000 }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </Form.Group>

          {error && (
            <Alert
              variant="danger"
              className={`text-center mt-2 ${styles.error}`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>{error}</div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => setError("")}
                >
                  Close
                </Button>
              </div>
            </Alert>
          )}

          <div className={styles.tableContainer}>
            <Table bordered striped hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Create Date</th>
                  <th>Last Update Date</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {giftCertificates.map((certificate) => (
                  <tr key={certificate.id}>
                    <td>{certificate.id}</td>
                    <td>{certificate.name}</td>
                    <td>{certificate.description}</td>
                    <td>${certificate.price.toFixed(2)}</td>
                    <td>{certificate.duration}</td>
                    <td>
                      {format(
                        new Date(certificate.createDate),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                    </td>
                    <td>
                      {format(
                        new Date(certificate.lastUpdateDate),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                    </td>
                    <td>
                      {certificate.tags.map((tag, index) => (
                        <span key={tag.id}>
                          {tag.name}
                          {index !== certificate.tags.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td>
                      <Row className="justify-content-center">
                        <Col xs="auto">
                          <ButtonGroup className={styles.buttonGroup}>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleShowViewModal(certificate)}
                            >
                              View
                            </Button>
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleShowEditModal(certificate)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleShowDeleteModal(certificate)}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {showViewModal && selectedCertificate && (
            <ViewModal
              certificate={selectedCertificate}
              handleClose={() => setShowViewModal(false)}
            />
          )}

          {showEditModal && selectedCertificate && (
            <EditModal
              certificate={selectedCertificate}
              handleClose={() => setShowEditModal(false)}
            />
          )}

          {showDeleteModal && selectedCertificate && (
            <DeleteModal
              certificate={selectedCertificate}
              handleClose={() => setShowDeleteModal(false)}
            />
          )}
        </div>

        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </HelmetProvider>
    </>
  );
};

export default Certificates;
