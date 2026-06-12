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
  `sclr_name` varchar(45) NOT NULL,
  `requiredclass` varchar(45) DEFAULT NULL,
  `minimumMarks` float DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `maximumincome` float DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `applicablefor` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sclrid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sclrinfo`
--

LOCK TABLES `sclrinfo` WRITE;
/*!40000 ALTER TABLE `sclrinfo` DISABLE KEYS */;
INSERT INTO `sclrinfo` VALUES (1,' Tata Capital Pankh Scholarship','11',60,NULL,2.5,'UP to 80000',NULL),(2,'HDFC Bank Parivartan\'s ECS',NULL,55,NULL,2.5,'Up to 75000',NULL),(3,'Reliance Foundation UG Scheme','12',60,NULL,15,'UP TO 2 Lakh',NULL),(4,'Santoor Scholarship (Wipro)','12',45,NULL,1,'24000','Girls'),(5,'LIC Golden Jubilee Scholarship','12',60,NULL,2.5,'20000',NULL),(6,'Post-Matric Minority Scheme',NULL,50,'Minority',2,'Tution Fees',NULL),(7,'Savitribai Phule Scholarship',NULL,45,'OBC',0,'1000/year','Girls'),(8,'Begum Hazrat Mahal National Scheme',NULL,50,'Minorities',2,'6000/year','Girls'),(9,'L\'Oréal India Young Women Scheme','12',85,NULL,6,'2.5 lakkh','Girls'),(10,'Kotak Kanya Scholarship','12',75,NULL,6,'1.5/year','Girls'),(11,'Post-Matric Scholarship for SC',NULL,45,'SC',2.5,'Full Fee',NULL),(12,'Post-Matric Scholarship for ST',NULL,45,'ST',2.5,'Full Fee',NULL),(13,'OBC Post-Matric State Scheme',NULL,45,'OBC',2.5,'Tution Fee',NULL),(14,'Merit-cum-Means Minority Scheme','12',50,'Minority',2.5,'20,000/year',NULL),(15,'National Fellowship for ST','12',45,'ST',6,'',NULL),(16,'Sitaram Jindal Scheme (Cat A/C)','',60,NULL,2.5,'Up To 3,200/mo',NULL);
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

-- Dump completed on 2026-06-11 18:08:52
