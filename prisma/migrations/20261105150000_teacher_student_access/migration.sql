CREATE TABLE "TeacherStudentAccess" (
  "id" TEXT NOT NULL,
  "teacherId" TEXT NOT NULL,
  "studentId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "TeacherStudentAccess_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "TeacherStudentAccess_teacherId_studentId_key" ON "TeacherStudentAccess"("teacherId","studentId");
CREATE INDEX "TeacherStudentAccess_studentId_idx" ON "TeacherStudentAccess"("studentId");
ALTER TABLE "TeacherStudentAccess" ADD CONSTRAINT "TeacherStudentAccess_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TeacherStudentAccess" ADD CONSTRAINT "TeacherStudentAccess_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
