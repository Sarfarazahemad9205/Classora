import AppNavbar from '../components/Navbar'
import Footer from '../components/Footer'

function About() {
  return (
    <>
      <AppNavbar />

      {/* ================= HERO SECTION ================= */}
      <section className="bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">

            <div className="col-lg-7">
              <span className="badge bg-light text-primary px-3 py-2 mb-3">
                ABOUT E-LEARNING
              </span>

              <h1 className="display-4 fw-bold mb-4">
                Learning Made Simple,
                <br />
                Learning Made Better.
              </h1>

              <p className="lead mb-4">
                E-Learning is a student-focused educational platform designed
                to make Class 10 learning simple, organized, and accessible.
              </p>

              <a href="/subjects" className="btn btn-light btn-lg px-4">
                Explore Subjects
              </a>
            </div>

            <div className="col-lg-5 text-center mt-5 mt-lg-0">
              <div className="bg-white rounded-4 shadow p-4 text-primary">
                <div className="display-1 mb-3">🎓</div>

                <h3 className="fw-bold">
                  Learn. Understand. Grow.
                </h3>

                <p className="text-secondary mb-0">
                  Everything you need for your Class 10 learning journey
                  in one place.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= WHO WE ARE ================= */}
      <section className="py-5">
        <div className="container py-5">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <span className="text-primary fw-bold">
                WHO WE ARE
              </span>

              <h2 className="display-6 fw-bold mt-2 mb-4">
                A Learning Platform Built for Students
              </h2>

              <p className="text-secondary fs-5">
                E-Learning is a simple online learning platform created
                especially for Class 10 students.
              </p>

              <p className="text-secondary">
                Our goal is to bring important learning resources together
                in one organized place. Instead of searching through different
                sources, students can choose a subject, select a chapter,
                and access the available study materials.
              </p>

              <p className="text-secondary">
                We focus on keeping learning straightforward, organized,
                and easy to navigate so students can spend more time
                learning and less time searching.
              </p>

            </div>


            <div className="col-lg-6">

              <div className="p-5 bg-light rounded-4 shadow-sm">

                <div className="row g-4">

                  <div className="col-6">
                    <div className="bg-white rounded-4 p-4 text-center shadow-sm h-100">
                      <div className="fs-1 mb-2">📚</div>
                      <h5 className="fw-bold">Organized</h5>
                      <p className="small text-secondary mb-0">
                        Content arranged subject-wise and chapter-wise.
                      </p>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="bg-white rounded-4 p-4 text-center shadow-sm h-100">
                      <div className="fs-1 mb-2">🎯</div>
                      <h5 className="fw-bold">Focused</h5>
                      <p className="small text-secondary mb-0">
                        Designed around the learning needs of students.
                      </p>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="bg-white rounded-4 p-4 text-center shadow-sm h-100">
                      <div className="fs-1 mb-2">💡</div>
                      <h5 className="fw-bold">Simple</h5>
                      <p className="small text-secondary mb-0">
                        Easy navigation without unnecessary complexity.
                      </p>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="bg-white rounded-4 p-4 text-center shadow-sm h-100">
                      <div className="fs-1 mb-2">🚀</div>
                      <h5 className="fw-bold">Accessible</h5>
                      <p className="small text-secondary mb-0">
                        Learning resources available from one platform.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= WHAT WE OFFER ================= */}
      <section className="py-5 bg-light">
        <div className="container py-5">

          <div className="text-center mb-5">

            <span className="text-primary fw-bold">
              WHAT WE OFFER
            </span>

            <h2 className="display-6 fw-bold mt-2">
              Everything Organized for Your Learning
            </h2>

            <p className="text-secondary mx-auto" style={{ maxWidth: '650px' }}>
              Our platform provides a simple structure that helps students
              move from subjects to chapters and finally to useful learning
              materials.
            </p>

          </div>


          <div className="row g-4">

            {/* Science */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">

                  <div
                    className="bg-primary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center mb-4"
                    style={{ width: '70px', height: '70px' }}
                  >
                    <span className="fs-1">🔬</span>
                  </div>

                  <h4 className="fw-bold">
                    Science
                  </h4>

                  <p className="text-secondary">
                    Explore Class 10 Science chapters and access available
                    study materials in an organized way.
                  </p>

                </div>
              </div>
            </div>


            {/* Mathematics */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">

                  <div
                    className="bg-primary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center mb-4"
                    style={{ width: '70px', height: '70px' }}
                  >
                    <span className="fs-1">📐</span>
                  </div>

                  <h4 className="fw-bold">
                    Mathematics
                  </h4>

                  <p className="text-secondary">
                    Study mathematical concepts chapter-by-chapter and
                    access useful resources for your preparation.
                  </p>

                </div>
              </div>
            </div>


            {/* English */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">

                  <div
                    className="bg-primary bg-opacity-10 rounded-4 d-flex align-items-center justify-content-center mb-4"
                    style={{ width: '70px', height: '70px' }}
                  >
                    <span className="fs-1">📖</span>
                  </div>

                  <h4 className="fw-bold">
                    English
                  </h4>

                  <p className="text-secondary">
                    Improve your English learning with organized chapters
                    and easily accessible study resources.
                  </p>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ================= WHY WE CREATED IT ================= */}
      <section className="py-5">
        <div className="container py-5">

          <div className="row justify-content-center">

            <div className="col-lg-9 text-center">

              <span className="text-primary fw-bold">
                OUR PURPOSE
              </span>

              <h2 className="display-6 fw-bold mt-2 mb-4">
                Why We Created E-Learning
              </h2>

              <p className="fs-5 text-secondary">
                Learning becomes easier when information is organized and
                easy to access.
              </p>

              <p className="text-secondary">
                Students often have to move between different resources
                while preparing for their examinations. E-Learning aims
                to provide a structured environment where students can
                find their subjects, chapters, and learning materials
                through a simple navigation system.
              </p>

              <p className="text-secondary">
                This platform is built with one simple idea:
                <strong className="text-dark">
                  {' '}make learning easier to access and easier to understand.
                </strong>
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ================= LEARNING APPROACH ================= */}
      <section className="py-5 bg-light">

        <div className="container py-5">

          <div className="text-center mb-5">

            <span className="text-primary fw-bold">
              OUR APPROACH
            </span>

            <h2 className="display-6 fw-bold mt-2">
              Simple Steps. Better Learning.
            </h2>

          </div>


          <div className="row g-4">

            <div className="col-md-4">
              <div className="text-center">

                <div
                  className="bg-primary text-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center fw-bold fs-4"
                  style={{ width: '70px', height: '70px' }}
                >
                  01
                </div>

                <h4 className="fw-bold">
                  Choose
                </h4>

                <p className="text-secondary">
                  Select the subject you want to study.
                </p>

              </div>
            </div>


            <div className="col-md-4">
              <div className="text-center">

                <div
                  className="bg-primary text-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center fw-bold fs-4"
                  style={{ width: '70px', height: '70px' }}
                >
                  02
                </div>

                <h4 className="fw-bold">
                  Explore
                </h4>

                <p className="text-secondary">
                  Select a chapter and explore the available resources.
                </p>

              </div>
            </div>


            <div className="col-md-4">
              <div className="text-center">

                <div
                  className="bg-primary text-white rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center fw-bold fs-4"
                  style={{ width: '70px', height: '70px' }}
                >
                  03
                </div>

                <h4 className="fw-bold">
                  Learn
                </h4>

                <p className="text-secondary">
                  Use the available materials to support your learning.
                </p>

              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================= GOAL ================= */}
      <section className="py-5">

        <div className="container py-5">

          <div className="bg-primary text-white rounded-4 shadow p-5 text-center">

            <div className="fs-1 mb-3">
              🎓
            </div>

            <h2 className="fw-bold mb-3">
              Our Goal
            </h2>

            <p className="lead mx-auto mb-4" style={{ maxWidth: '750px' }}>
              To create a simple and organized digital learning environment
              where Class 10 students can easily find the resources they
              need for their studies.
            </p>

            <a
              href="/subjects"
              className="btn btn-light btn-lg px-4"
            >
              Start Learning
            </a>

          </div>

        </div>

      </section>


      <Footer />
    </>
  )
}

export default About