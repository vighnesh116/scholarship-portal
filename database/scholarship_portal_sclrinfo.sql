-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: scholarship_portal
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sclrinfo`
--

DROP TABLE IF EXISTS `sclrinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sclrinfo` (
  `sclrid` int NOT NULL AUTO_INCREMENT,
  `sclrname` varchar(45) NOT NULL,
  `percentreeq` int DEFAULT NULL,
  `miniincome` int DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `educationqualifiation` int DEFAULT NULL,
  `caste` varchar(45) DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `application_link` varchar(500) DEFAULT NULL,
  `deadline` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sclrid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sclrinfo`
--

LOCK TABLES `sclrinfo` WRITE;
/*!40000 ALTER TABLE `sclrinfo` DISABLE KEYS */;
INSERT INTO `sclrinfo` VALUES (1,'Tata Capital Pankh Scholarship',60,250000,NULL,11,NULL,'Up to 80000','https://www.tatacapital.com/scholarship-program.html','26-Dec-2025'),(2,'HDFC Bank Parivartan ECS',55,250000,NULL,NULL,NULL,'Up to 75000','https://www.hdfcbankecss.com','31-Dec-2025'),(3,'Reliance Foundation UG Scheme',60,150000,NULL,12,NULL,'Up to 200000','https://scholarships.reliancefoundation.org','04-Oct-2025'),(4,'Santoor Scholarship (Wipro)',45,100000,'Female',12,NULL,'24000','https://www.santoorscholarships.com','31-Oct-2025'),(5,'LIC Golden Jubilee Scholarship',60,250000,NULL,12,NULL,'20000','https://licindia.in','31-Dec-2025'),(6,'Post-Matric Minority Scheme',50,200000,NULL,NULL,'Minority','Tuition Fees','https://scholarships.gov.in','31-Oct-2025'),(7,'Savitribai Phule Scholarship',45,0,'Female',NULL,'OBC','1000/year','https://mahadbt.maharashtra.gov.in','31-Mar-2026'),(8,'Begum Hazrat Mahal National Scheme',50,200000,'Female',NULL,'Minority','6000/year','https://scholarships.gov.in','31-Oct-2025'),(9,'L\'Oreal India Young Women Scheme',85,600000,'Female',12,NULL,'250000','https://www.lorealindia.com','15-Jul-2025'),(10,'Kotak Kanya Scholarship',75,600000,'Female',12,NULL,'150000/year','https://www.buddy4study.com/page/kotak-kanya-scholarship','15-Dec-2025'),(11,'Post-Matric Scholarship for SC',45,250000,NULL,NULL,'SC','Full Fee','https://scholarships.gov.in','31-Oct-2025'),(12,'Post-Matric Scholarship for ST',45,250000,NULL,NULL,'ST','Full Fee','https://scholarships.gov.in','31-Oct-2025'),(13,'OBC Post-Matric State Scheme',45,250000,NULL,NULL,'OBC','Tuition Fee','https://scholarships.gov.in','31-Oct-2025'),(14,'Merit-cum-Means Minority Scheme',50,250000,NULL,12,'Minority','20000/year','https://scholarships.gov.in','31-Oct-2025'),(15,'National Fellowship for ST',45,600000,NULL,12,'ST','Fellowship','https://fellowships.gov.in','31-Jan-2026'),(16,'Sitaram Jindal Scheme (Cat A/C)',60,250000,NULL,NULL,NULL,'Up to 3200','https://www.sitaramjindalfoundation.org','Open Throughout Year');
/*!40000 ALTER TABLE `sclrinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-15 11:09:17
