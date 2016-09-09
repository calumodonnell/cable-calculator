<?php
/*
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once($_SERVER['DOCUMENT_ROOT'] . "/wp-load.php");

global $wpdb;

$result = $wpdb->query("INSERT INTO `cw_cable_connector_pricing` (`id`, `cable_id`, `connector_id`, `con_part_no`, `con_series`, `price`) VALUES
(508, 86, 32, 'SMS', 'SMA', '5.20'),
(509, 86, 34, 'SMR', 'SMA', '10.65'),
(510, 86, 35, 'SFBS', 'SMA', '7.90'),
(511, 86, 43, 'NMS', 'Type N', '5.50'),
(512, 86, 46, 'NMR', 'Type N', '12.50'),
(513, 86, 47, 'NFBS', 'Type N', '10.20'),
(514, 86, 93, 'TMS', 'TNC', '6.25'),
(515, 86, 60, 'BMS', 'BNC', '8.00'),
(516, 86, 82, '7/16 MS', '7/16', '17.00'),
(517, 87, 32, 'SMS', 'SMA', '14.00'),
(518, 87, 43, 'NMS', 'Type N', '7.50'),
(519, 87, 46, 'NMR', 'Type N', '11.00'),
(520, 87, 47, 'NFBS', 'Type N', '13.05'),
(521, 87, 48, 'NFS', 'Type N', '8.24'),
(522, 87, 93, 'TMS', 'TNC', '7.00'),
(523, 87, 55, 'TMR', 'TNC', '15.50'),
(524, 87, 60, 'BMS', 'BNC', '12.00'),
(525, 87, 82, '7/16 MS', '7/16', '40.00'),
(526, 87, 83, '7/16 MR', '7/16', '58.00'),
(680, 67, 32, 'SMS', 'SMA', '2.50'),
(681, 67, 36, 'SFS', 'SMA', '12.00'),
(682, 67, 64, 'SMBFS', 'SMB', '5.00'),
(683, 67, 71, 'SMPFR', 'SMP', '5.50'),
(684, 67, 70, 'SSMS', 'SSMA', '8.75'),
(685, 67, 69, 'SSMR', 'SSMA', '13.50'),
(686, 67, 77, 'GPPOFR', 'GPPO', '17.00'),
(687, 68, 32, 'SMS', 'SMA', '1.85'),
(688, 68, 37, 'SMSR', 'SMA', '2.70'),
(689, 68, 34, 'SMR', 'SMA', '4.00'),
(690, 68, 35, 'SFBS', 'SMA', '8.25'),
(691, 68, 36, 'SFS', 'SMA', '5.50'),
(692, 68, 43, 'NMS', 'Type N', '4.65'),
(693, 68, 49, 'NMSR', 'Type N', '5.55'),
(694, 68, 47, 'NFBS', 'Type N', '6.50'),
(695, 68, 93, 'TMS', 'TNC', '3.50'),
(696, 68, 55, 'TMR', 'TNC', '5.50'),
(697, 68, 56, 'TFBS', 'TNC', '12.50'),
(698, 68, 64, 'SMBFS', 'SMB', '4.50'),
(699, 68, 71, 'SMPFR', 'SMP', '6.00'),
(700, 68, 79, 'MCXMR', 'MCX', '2.50'),
(701, 68, 80, 'MMCXMS', 'MMCX', '6.00'),
(702, 68, 81, 'MMCXMR', 'MMCX', '2.00'),
(703, 68, 60, 'BMS', 'BNC', '1.80'),
(704, 68, 61, 'BMR', 'BNC', '4.50'),
(705, 68, 62, 'BFBS', 'BNC', '2.50'),
(706, 68, 66, 'OSPMBS', 'OSP', '14.00'),
(707, 68, 68, 'OSSPMBS', 'OSSP', '7.00'),
(708, 69, 32, 'SMS', 'SMA', '3.00'),
(709, 69, 39, 'SMSC', 'SMA', '3.65'),
(710, 69, 37, 'SMSR', 'SMA', '2.50'),
(711, 69, 40, 'SMSPF', 'SMA', '2.50'),
(712, 69, 34, 'SMR', 'SMA', '7.00'),
(713, 69, 35, 'SFBS', 'SMA', '9.25'),
(714, 69, 36, 'SFS', 'SMA', '5.30'),
(715, 69, 49, 'NMSR', 'Type N', '4.50'),
(716, 69, 47, 'NFBS', 'Type N', '5.00'),
(717, 69, 48, 'NFS', 'Type N', '25.00'),
(718, 69, 93, 'TMS', 'TNC', '2.50'),
(719, 69, 55, 'TMR', 'TNC', '32.00'),
(720, 69, 56, 'TFBS', 'TNC', '2.50'),
(721, 69, 57, 'TFS', 'TNC', '14.00'),
(722, 69, 79, 'MCXMR', 'MCX', '2.95'),
(723, 69, 60, 'BMS', 'BNC', '2.50'),
(724, 69, 62, 'BFBS', 'BNC', '2.50'),
(725, 69, 66, 'OSPMBS', 'OSP', '15.00'),
(751, 2, 24, 'MMS', '2.4mm', '24.50'),
(752, 2, 26, 'MFS', '2.4mm', '26.00'),
(753, 2, 17, 'KMS', '2.9mm', '24.50'),
(754, 2, 32, 'SMS', 'SMA', '20.00'),
(755, 2, 34, 'SMR', 'SMA', '34.50'),
(756, 2, 43, 'NMS', 'Type N', '20.00'),
(757, 4, 24, 'MMS', '2.4mm', '16.00'),
(758, 4, 26, 'MFS', '2.4mm', '30.00'),
(759, 4, 17, 'KMS', '2.9mm', '14.00'),
(760, 4, 2, 'KMSV', '2.9mm', '22.50'),
(761, 4, 20, 'KMR', '2.9mm', '95.00'),
(762, 4, 21, 'KFBS', '2.9mm', '40.00'),
(763, 4, 22, 'KFS', '2.9mm', '25.00'),
(764, 4, 32, 'SMS', 'SMA', '13.50'),
(765, 4, 34, 'SMR', 'SMA', '23.70'),
(766, 4, 43, 'NMS', 'Type N', '25.00'),
(767, 39, 17, 'KMS', '2.9mm', '14.00'),
(768, 39, 2, 'KMSV', '2.9mm', '22.76'),
(769, 39, 21, 'KFBS', '2.9mm', '31.50'),
(770, 39, 32, 'SMS', 'SMA', '7.50'),
(771, 39, 31, 'SMSV', 'SMA', '14.50'),
(772, 39, 33, 'SMSLP', 'SMA', '8.50'),
(773, 39, 34, 'SMR', 'SMA', '31.00'),
(774, 39, 38, 'SMR90', 'SMA', '31.00'),
(775, 39, 35, 'SFBS', 'SMA', '28.00'),
(776, 39, 36, 'SFS', 'SMA', '22.00'),
(777, 39, 43, 'NMS', 'Type N', '12.50'),
(778, 39, 42, 'NMSV', 'Type N', '17.50'),
(779, 39, 44, 'NMSLP', 'Type N', '17.50'),
(780, 39, 46, 'NMR', 'Type N', '22.00'),
(781, 39, 50, 'NMR90', 'Type N', '31.00'),
(782, 39, 45, 'NMRLP', 'Type N', '22.00'),
(783, 39, 47, 'NFBS', 'Type N', '27.00'),
(784, 39, 52, 'NFBSLP', 'Type N', '27.00'),
(785, 39, 48, 'NFS', 'Type N', '32.00'),
(786, 39, 93, 'TMS', 'TNC', '16.25'),
(787, 39, 53, 'TMSV', 'TNC', '26.50'),
(788, 39, 55, 'TMR', 'TNC', '37.00'),
(789, 39, 56, 'TFBS', 'TNC', '55.00'),
(790, 39, 57, 'TFS', 'TNC', '55.00'),
(791, 39, 60, 'BMS', 'BNC', '15.00'),
(792, 39, 82, '7/16 MS', '7/16', '34.00'),
(793, 58, 17, 'KMS', '2.9mm', '14.00'),
(794, 58, 2, 'KMSV', '2.9mm', '22.76'),
(795, 58, 21, 'KFBS', '2.9mm', '31.50'),
(796, 58, 32, 'SMS', 'SMA', '7.50'),
(797, 58, 31, 'SMSV', 'SMA', '14.50'),
(798, 58, 33, 'SMSLP', 'SMA', '8.50'),
(799, 58, 34, 'SMR', 'SMA', '31.00'),
(800, 58, 38, 'SMR90', 'SMA', '31.00'),
(801, 58, 35, 'SFBS', 'SMA', '28.00'),
(802, 58, 36, 'SFS', 'SMA', '22.00'),
(803, 58, 43, 'NMS', 'Type N', '12.50'),
(804, 58, 42, 'NMSV', 'Type N', '17.50'),
(805, 58, 44, 'NMSLP', 'Type N', '17.50'),
(806, 58, 46, 'NMR', 'Type N', '22.00'),
(807, 58, 50, 'NMR90', 'Type N', '31.00'),
(808, 58, 45, 'NMRLP', 'Type N', '22.00'),
(809, 58, 47, 'NFBS', 'Type N', '27.00'),
(810, 58, 52, 'NFBSLP', 'Type N', '27.00'),
(811, 58, 48, 'NFS', 'Type N', '32.00'),
(812, 58, 93, 'TMS', 'TNC', '16.25'),
(813, 58, 53, 'TMSV', 'TNC', '26.50'),
(814, 58, 55, 'TMR', 'TNC', '37.00'),
(815, 58, 56, 'TFBS', 'TNC', '55.00'),
(816, 58, 57, 'TFS', 'TNC', '55.00'),
(817, 58, 60, 'BMS', 'BNC', '15.00'),
(818, 58, 82, '7/16 MS', '7/16', '34.00'),
(819, 59, 32, 'SMS', 'SMA', '20.00'),
(820, 59, 34, 'SMR', 'SMA', '115.00'),
(821, 59, 35, 'SFBS', 'SMA', '67.00'),
(822, 59, 36, 'SFS', 'SMA', '60.00'),
(823, 59, 43, 'NMS', 'Type N', '20.00'),
(824, 59, 46, 'NMR', 'Type N', '110.00'),
(825, 59, 47, 'NFBS', 'Type N', '65.00'),
(826, 59, 48, 'NFS', 'Type N', '80.00'),
(827, 59, 93, 'TMS', 'TNC', '20.00'),
(828, 59, 53, 'TMSV', 'TNC', '40.00'),
(829, 59, 55, 'TMR', 'TNC', '45.00'),
(830, 59, 56, 'TFBS', 'TNC', '77.00'),
(831, 59, 57, 'TFS', 'TNC', '70.00'),
(832, 59, 82, '7/16 MS', '7/16', '26.00'),
(833, 59, 58, 'SCMS', 'SC', '65.00'),
(834, 59, 41, 'SCMR', 'SMA', '152.00'),
(835, 59, 59, 'SCFBS', 'SC', '117.00'),
(851, 60, 32, 'SMS', 'SMA', '22.00'),
(852, 60, 34, 'SMR', 'SMA', '82.50'),
(853, 60, 35, 'SFBS', 'SMA', '64.00'),
(854, 60, 36, 'SFS', 'SMA', '57.00'),
(855, 60, 43, 'NMS', 'Type N', '22.00'),
(856, 60, 46, 'NMR', 'Type N', '94.00'),
(857, 60, 47, 'NFBS', 'Type N', '65.00'),
(858, 60, 48, 'NFS', 'Type N', '77.00'),
(859, 60, 93, 'TMS', 'TNC', '22.00'),
(860, 60, 55, 'TMR', 'TNC', '104.00'),
(861, 60, 56, 'TFBS', 'TNC', '74.00'),
(862, 60, 57, 'TFS', 'TNC', '67.00'),
(863, 60, 58, 'SCMS', 'SC', '62.00'),
(864, 60, 41, 'SCMR', 'SMA', '149.00'),
(865, 60, 59, 'SCFBS', 'SC', '114.00'),
(866, 76, 24, 'MMS', '2.4mm', '22.00'),
(867, 76, 25, 'MFBS', '2.4mm', '49.50'),
(868, 76, 26, 'MFS', '2.4mm', '35.00'),
(869, 76, 17, 'KMS', '2.9mm', '10.00'),
(870, 76, 21, 'KFBS', '2.9mm', '25.00'),
(871, 76, 22, 'KFS', '2.9mm', '30.00'),
(872, 76, 32, 'SMS', 'SMA', '2.50'),
(873, 76, 37, 'SMSR', 'SMA', '3.50'),
(874, 76, 34, 'SMR', 'SMA', '4.00'),
(875, 76, 35, 'SFBS', 'SMA', '6.00'),
(876, 76, 36, 'SFS', 'SMA', '5.50'),
(877, 76, 43, 'NMS', 'Type N', '4.65'),
(878, 76, 49, 'NMSR', 'Type N', '5.55'),
(879, 76, 47, 'NFBS', 'Type N', '6.50'),
(880, 76, 93, 'TMS', 'TNC', '9.00'),
(881, 76, 55, 'TMR', 'TNC', '5.50'),
(882, 76, 56, 'TFBS', 'TNC', '17.50'),
(883, 76, 72, 'SMPFS', 'SMP', '4.50'),
(884, 76, 71, 'SMPFR', 'SMP', '6.00'),
(885, 76, 78, 'MCXMS', 'MCX', '2.00'),
(886, 76, 79, 'MCXMR', 'MCX', '3.00'),
(887, 76, 80, 'MMCXMS', 'MMCX', '6.00'),
(888, 76, 81, 'MMCXMR', 'MMCX', '2.00'),
(889, 76, 60, 'BMS', 'BNC', '1.80'),
(890, 76, 61, 'BMR', 'BNC', '4.50'),
(891, 76, 62, 'BFBS', 'BNC', '2.50'),
(892, 76, 66, 'OSPMBS', 'OSP', '14.00'),
(893, 76, 68, 'OSSPMBS', 'OSSP', '7.00'),
(894, 76, 76, 'GPPOFS', 'GPPO', '20.00'),
(895, 76, 77, 'GPPOFR', 'GPPO', '32.00'),
(952, 82, 32, 'SMS', 'SMA', '2.50'),
(953, 82, 34, 'SMR', 'SMA', '4.50'),
(954, 82, 35, 'SFBS', 'SMA', '4.00'),
(955, 82, 36, 'SFS', 'SMA', '3.00'),
(956, 82, 43, 'NMS', 'Type N', '4.50'),
(957, 82, 46, 'NMR', 'Type N', '4.55'),
(958, 82, 47, 'NFBS', 'Type N', '5.00'),
(959, 82, 48, 'NFS', 'Type N', '4.50'),
(960, 82, 93, 'TMS', 'TNC', '4.00'),
(961, 82, 55, 'TMR', 'TNC', '3.50'),
(962, 82, 56, 'TFBS', 'TNC', '4.20'),
(963, 82, 78, 'MCXMS', 'MCX', '4.50'),
(964, 82, 79, 'MCXMR', 'MCX', '3.00'),
(965, 82, 80, 'MMCXMS', 'MMCX', '6.00'),
(966, 82, 81, 'MMCXMR', 'MMCX', '4.00'),
(967, 82, 60, 'BMS', 'BNC', '3.50'),
(968, 82, 61, 'BMR', 'BNC', '4.00'),
(969, 82, 62, 'BFBS', 'BNC', '4.00'),
(970, 83, 32, 'SMS', 'SMA', '3.50'),
(971, 83, 34, 'SMR', 'SMA', '7.50'),
(972, 83, 35, 'SFBS', 'SMA', '15.00'),
(973, 83, 36, 'SFS', 'SMA', '10.00'),
(974, 83, 43, 'NMS', 'Type N', '5.00'),
(975, 83, 46, 'NMR', 'Type N', '7.50'),
(976, 83, 47, 'NFBS', 'Type N', '6.00'),
(977, 83, 48, 'NFS', 'Type N', '7.40'),
(978, 83, 93, 'TMS', 'TNC', '8.00'),
(979, 83, 55, 'TMR', 'TNC', '13.00'),
(980, 83, 56, 'TFBS', 'TNC', '9.00'),
(981, 83, 57, 'TFS', 'TNC', '8.00'),
(982, 83, 60, 'BMS', 'BNC', '4.25'),
(983, 83, 61, 'BMR', 'BNC', '4.50'),
(984, 83, 62, 'BFBS', 'BNC', '4.00'),
(985, 83, 63, 'BFS', 'BNC', '1.75'),
(986, 84, 32, 'SMS', 'SMA', '3.50'),
(987, 84, 34, 'SMR', 'SMA', '7.50'),
(988, 84, 35, 'SFBS', 'SMA', '15.00'),
(989, 84, 36, 'SFS', 'SMA', '10.00'),
(990, 84, 43, 'NMS', 'Type N', '5.00'),
(991, 84, 46, 'NMR', 'Type N', '7.50'),
(992, 84, 47, 'NFBS', 'Type N', '6.00'),
(993, 84, 48, 'NFS', 'Type N', '7.40'),
(994, 84, 93, 'TMS', 'TNC', '8.00'),
(995, 84, 55, 'TMR', 'TNC', '13.00'),
(996, 84, 56, 'TFBS', 'TNC', '9.00'),
(997, 84, 57, 'TFS', 'TNC', '8.00'),
(998, 84, 60, 'BMS', 'BNC', '4.25'),
(999, 84, 61, 'BMR', 'BNC', '4.50'),
(1000, 84, 62, 'BFBS', 'BNC', '4.00'),
(1001, 84, 63, 'BFS', 'BNC', '1.75'),
(1002, 80, 32, 'SMS', 'SMA', '2.30'),
(1003, 80, 34, 'SMR', 'SMA', '4.00'),
(1004, 80, 35, 'SFBS', 'SMA', '4.00'),
(1005, 80, 36, 'SFS', 'SMA', '3.50'),
(1006, 80, 43, 'NMS', 'Type N', '4.75'),
(1007, 80, 46, 'NMR', 'Type N', '5.00'),
(1008, 80, 47, 'NFBS', 'Type N', '6.00'),
(1009, 80, 93, 'TMS', 'TNC', '4.50'),
(1010, 80, 56, 'TFBS', 'TNC', '5.00'),
(1011, 80, 57, 'TFS', 'TNC', '4.50'),
(1012, 80, 78, 'MCXMS', 'MCX', '1.75'),
(1013, 80, 79, 'MCXMR', 'MCX', '2.50'),
(1014, 80, 81, 'MMCXMR', 'MMCX', '5.25'),
(1015, 80, 60, 'BMS', 'BNC', '3.50'),
(1016, 80, 61, 'BMR', 'BNC', '5.00'),
(1017, 80, 62, 'BFBS', 'BNC', '3.50'),
(1018, 85, 32, 'SMS', 'SMA', '3.50'),
(1019, 85, 34, 'SMR', 'SMA', '3.50'),
(1020, 85, 35, 'SFBS', 'SMA', '15.00'),
(1021, 85, 36, 'SFS', 'SMA', '10.00'),
(1022, 85, 43, 'NMS', 'Type N', '5.00'),
(1023, 85, 46, 'NMR', 'Type N', '7.50'),
(1024, 85, 47, 'NFBS', 'Type N', '6.00'),
(1025, 85, 48, 'NFS', 'Type N', '7.40'),
(1026, 85, 93, 'TMS', 'TNC', '8.00'),
(1027, 85, 55, 'TMR', 'TNC', '13.00'),
(1028, 85, 56, 'TFBS', 'TNC', '9.00'),
(1029, 85, 57, 'TFS', 'TNC', '8.00'),
(1030, 85, 60, 'BMS', 'BNC', '4.25'),
(1031, 85, 61, 'BMR', 'BNC', '4.50'),
(1032, 85, 62, 'BFBS', 'BNC', '4.00'),
(1033, 85, 63, 'BFS', 'BNC', '1.75'),
(1034, 78, 24, 'MMS', '2.4mm', '19.00'),
(1035, 78, 27, 'MMSR', '2.4mm', '19.00'),
(1036, 78, 17, 'KMS', '2.9mm', '9.00'),
(1037, 78, 23, 'KMSR', '2.9mm', '9.00'),
(1038, 78, 22, 'KFS', '2.9mm', '28.50'),
(1039, 78, 32, 'SMS', 'SMA', '7.55'),
(1040, 78, 37, 'SMSR', 'SMA', '9.55'),
(1041, 78, 36, 'SFS', 'SMA', '16.00'),
(1042, 79, 17, 'KMS', '2.9mm', '8.00'),
(1043, 79, 23, 'KMSR', '2.9mm', '10.00'),
(1044, 79, 32, 'SMS', 'SMA', '5.00'),
(1045, 79, 37, 'SMSR', 'SMA', '7.00'),
(1046, 75, 32, 'SMS', 'SMA', '2.50'),
(1047, 75, 36, 'SFS', 'SMA', '12.00'),
(1048, 75, 72, 'SMPFS', 'SMP', '5.00'),
(1049, 75, 71, 'SMPFR', 'SMP', '5.50'),
(1050, 75, 70, 'SSMS', 'SSMA', '8.75'),
(1051, 75, 69, 'SSMR', 'SSMA', '13.50'),
(1052, 75, 76, 'GPPOFS', 'GPPO', '15.00'),
(1053, 75, 77, 'GPPOFR', 'GPPO', '17.00'),
(1054, 77, 17, 'KMS', '2.9mm', '20.50'),
(1055, 77, 32, 'SMS', 'SMA', '3.00'),
(1056, 77, 37, 'SMSR', 'SMA', '2.50'),
(1057, 77, 34, 'SMR', 'SMA', '7.00'),
(1058, 77, 35, 'SFBS', 'SMA', '9.25'),
(1059, 77, 36, 'SFS', 'SMA', '5.30'),
(1060, 77, 43, 'NMS', 'Type N', '2.75'),
(1061, 77, 49, 'NMSR', 'Type N', '4.50'),
(1062, 77, 47, 'NFBS', 'Type N', '5.00'),
(1063, 77, 48, 'NFS', 'Type N', '25.00'),
(1064, 77, 93, 'TMS', 'TNC', '2.50'),
(1065, 77, 55, 'TMR', 'TNC', '32.00'),
(1066, 77, 56, 'TFBS', 'TNC', '2.50'),
(1067, 77, 57, 'TFS', 'TNC', '14.00'),
(1068, 77, 79, 'MCXMR', 'MCX', '2.95'),
(1069, 77, 60, 'BMS', 'BNC', '2.50'),
(1070, 77, 62, 'BFBS', 'BNC', '2.50'),
(1071, 77, 66, 'OSPMBS', 'OSP', '15.00'),
(1072, 61, 24, 'MMS', '2.4mm', '24.50'),
(1073, 61, 17, 'KMS', '2.9mm', '21.50'),
(1074, 61, 32, 'SMS', 'SMA', '17.00'),
(1075, 61, 1, 'VMS', '1.85mm', '40.50'),
(1076, 62, 24, 'MMS', '2.4mm', '16.00'),
(1077, 62, 17, 'KMS', '2.9mm', '14.00'),
(1078, 62, 32, 'SMS', 'SMA', '13.50'),
(1079, 62, 43, 'NMS', 'Type N', '25.00'),
(1080, 62, 28, '3MS', '3.5mm', '20.70'),
(1081, 63, 24, 'MMS', '2.4mm', '26.00'),
(1082, 63, 26, 'MFS', '2.4mm', '31.50'),
(1083, 63, 17, 'KMS', '2.9mm', '16.50'),
(1084, 63, 22, 'KFS', '2.9mm', '29.50'),
(1085, 63, 32, 'SMS', 'SMA', '14.00'),
(1086, 63, 34, 'SMR', 'SMA', '34.00'),
(1087, 63, 43, 'NMS', 'Type N', '22.50'),
(1088, 63, 46, 'NMR', 'Type N', '25.00'),
(1089, 63, 47, 'NFBS', 'Type N', '35.10'),
(1090, 63, 93, 'TMS', 'TNC', '22.50'),
(1091, 64, 17, 'KMS', '2.9mm', '24.50'),
(1092, 64, 32, 'SMS', 'SMA', '15.00'),
(1093, 64, 34, 'SMR', 'SMA', '34.50'),
(1094, 64, 38, 'SMR90', 'SMA', '22.00'),
(1095, 64, 35, 'SFBS', 'SMA', '36.50'),
(1096, 64, 36, 'SFS', 'SMA', '28.00'),
(1097, 64, 43, 'NMS', 'Type N', '22.00'),
(1098, 64, 46, 'NMR', 'Type N', '42.50'),
(1099, 64, 50, 'NMR90', 'Type N', '24.00'),
(1100, 64, 47, 'NFBS', 'Type N', '37.00'),
(1101, 64, 93, 'TMS', 'TNC', '20.00'),
(1102, 64, 60, 'BMS', 'BNC', '15.00'),
(1103, 65, 32, 'SMS', 'SMA', '23.00'),
(1104, 65, 43, 'NMS', 'Type N', '25.00'),
(1105, 65, 93, 'TMS', 'TNC', '25.00'),
(1106, 65, 82, '7/16 MS', '7/16', '32.70'),
(1107, 66, 43, 'NMS', 'Type N', '75.00'),
(1108, 66, 46, 'NMR', 'Type N', '110.00'),
(1109, 66, 93, 'TMS', 'TNC', '107.00'),
(1110, 66, 58, 'SCMS', 'SC', '130.00'),
(1111, 66, 41, 'SCMR', 'SMA', '248.00'),
(1112, 66, 59, 'SCFBS', 'SC', '235.00'),
(1113, 81, 32, 'SMS', 'SMA', '3.00'),
(1114, 81, 34, 'SMR', 'SMA', '5.00'),
(1115, 81, 35, 'SFBS', 'SMA', '4.00'),
(1116, 81, 36, 'SFS', 'SMA', '3.50'),
(1117, 81, 43, 'NMS', 'Type N', '4.75'),
(1118, 81, 46, 'NMR', 'Type N', '5.00'),
(1119, 81, 47, 'NFBS', 'Type N', '6.00'),
(1120, 81, 56, 'TFBS', 'TNC', '5.00'),
(1121, 81, 57, 'TFS', 'TNC', '4.50'),
(1122, 81, 78, 'MCXMS', 'MCX', '1.75'),
(1123, 81, 79, 'MCXMR', 'MCX', '2.50'),
(1124, 81, 81, 'MMCXMR', 'MMCX', '5.25'),
(1125, 81, 60, 'BMS', 'BNC', '5.00'),
(1126, 81, 62, 'BFBS', 'BNC', '3.50'),
(1163, 70, 17, 'KMS', '2.9mm', '3.50'),
(1164, 70, 23, 'KMSR', '2.9mm', '4.00'),
(1165, 70, 32, 'SMS', 'SMA', '3.00'),
(1166, 70, 39, 'SMSC', 'SMA', '2.50'),
(1167, 70, 34, 'SMR', 'SMA', '7.00'),
(1168, 70, 35, 'SFBS', 'SMA', '9.25'),
(1169, 70, 36, 'SFS', 'SMA', '5.30'),
(1170, 70, 43, 'NMS', 'Type N', '2.75'),
(1171, 70, 49, 'NMSR', 'Type N', '4.50'),
(1172, 70, 47, 'NFBS', 'Type N', '5.00'),
(1173, 70, 48, 'NFS', 'Type N', '25.00'),
(1174, 70, 93, 'TMS', 'TNC', '2.50'),
(1175, 70, 55, 'TMR', 'TNC', '32.00'),
(1176, 70, 56, 'TFBS', 'TNC', '2.50'),
(1177, 70, 57, 'TFS', 'TNC', '14.00'),
(1178, 70, 79, 'MCXMR', 'MCX', '2.95'),
(1179, 70, 60, 'BMS', 'BNC', '2.50'),
(1180, 70, 62, 'BFBS', 'BNC', '2.50'),
(1181, 70, 66, 'OSPMBS', 'OSP', '15.00'),
(1193, 74, 32, 'SMS', 'SMA', '2.50'),
(1194, 74, 34, 'SMR', 'SMA', '7.00'),
(1195, 74, 35, 'SFBS', 'SMA', '8.25'),
(1196, 74, 36, 'SFS', 'SMA', '5.30'),
(1197, 74, 43, 'NMS', 'Type N', '2.75'),
(1198, 74, 46, 'NMR', 'Type N', '4.50'),
(1199, 74, 47, 'NFBS', 'Type N', '4.60'),
(1200, 74, 93, 'TMS', 'TNC', '2.50'),
(1201, 74, 60, 'BMS', 'BNC', '2.50'),
(1202, 74, 62, 'BFBS', 'BNC', '2.50'),
(1203, 74, 84, 'QMAMS', 'QMA', '5.95'),
(1222, 73, 17, 'KMS', '2.9mm', '20.50'),
(1223, 73, 32, 'SMS', 'SMA', '3.00'),
(1224, 73, 37, 'SMSR', 'SMA', '2.50'),
(1225, 73, 34, 'SMR', 'SMA', '7.00'),
(1226, 73, 35, 'SFBS', 'SMA', '9.25'),
(1227, 73, 36, 'SFS', 'SMA', '5.30'),
(1228, 73, 43, 'NMS', 'Type N', '2.75'),
(1229, 73, 49, 'NMSR', 'Type N', '4.50'),
(1230, 73, 47, 'NFBS', 'Type N', '5.00'),
(1231, 73, 48, 'NFS', 'Type N', '25.00'),
(1232, 73, 93, 'TMS', 'TNC', '2.50'),
(1233, 73, 55, 'TMR', 'TNC', '32.00'),
(1234, 73, 56, 'TFBS', 'TNC', '2.50'),
(1235, 73, 57, 'TFS', 'TNC', '14.00'),
(1236, 73, 79, 'MCXMR', 'MCX', '2.95'),
(1237, 73, 60, 'BMS', 'BNC', '2.50'),
(1238, 73, 62, 'BFBS', 'BNC', '2.50'),
(1239, 73, 67, 'OSPFBS', 'OSP', '15.00'),
(1249, 72, 24, 'MMS', '2.4mm', '22.00'),
(1250, 72, 25, 'MFBS', '2.4mm', '49.50'),
(1251, 72, 26, 'MFS', '2.4mm', '35.00'),
(1252, 72, 17, 'KMS', '2.9mm', '10.00'),
(1253, 72, 21, 'KFBS', '2.9mm', '25.00'),
(1254, 72, 22, 'KFS', '2.9mm', '20.00'),
(1255, 72, 32, 'SMS', 'SMA', '2.50'),
(1256, 72, 37, 'SMSR', 'SMA', '3.50'),
(1257, 72, 34, 'SMR', 'SMA', '4.00'),
(1258, 72, 35, 'SFBS', 'SMA', '6.00'),
(1259, 72, 36, 'SFS', 'SMA', '5.50'),
(1260, 72, 43, 'NMS', 'Type N', '4.65'),
(1261, 72, 49, 'NMSR', 'Type N', '5.55'),
(1262, 72, 47, 'NFBS', 'Type N', '6.50'),
(1263, 72, 53, 'TMSV', 'TNC', '9.00'),
(1264, 72, 55, 'TMR', 'TNC', '5.50'),
(1265, 72, 56, 'TFBS', 'TNC', '17.50'),
(1266, 72, 72, 'SMPFS', 'SMP', '4.50'),
(1267, 72, 65, 'SMBFR', 'SMB', '6.00'),
(1268, 72, 78, 'MCXMS', 'MCX', '2.00'),
(1269, 72, 79, 'MCXMR', 'MCX', '3.00'),
(1270, 72, 80, 'MMCXMS', 'MMCX', '6.00'),
(1271, 72, 81, 'MMCXMR', 'MMCX', '2.00'),
(1272, 72, 60, 'BMS', 'BNC', '1.80'),
(1273, 72, 61, 'BMR', 'BNC', '4.50'),
(1274, 72, 62, 'BFBS', 'BNC', '2.50'),
(1275, 72, 67, 'OSPFBS', 'OSP', '14.00'),
(1276, 72, 68, 'OSSPMBS', 'OSSP', '7.00'),
(1277, 72, 76, 'GPPOFS', 'GPPO', '20.00'),
(1278, 72, 77, 'GPPOFR', 'GPPO', '32.00'),
(1310, 71, 32, 'SMS', 'SMA', '2.50'),
(1311, 71, 36, 'SFS', 'SMA', '12.00'),
(1312, 71, 72, 'SMPFS', 'SMP', '5.00'),
(1313, 71, 71, 'SMPFR', 'SMP', '5.50'),
(1314, 71, 70, 'SSMS', 'SSMA', '8.75'),
(1315, 71, 69, 'SSMR', 'SSMA', '13.50'),
(1316, 71, 76, 'GPPOFS', 'GPPO', '15.00'),
(1317, 71, 77, 'GPPOFR', 'GPPO', '17.00'),
(1380, 0, 29, '3FS', '3.5mm', '123.00'),
(1381, 0, 61, 'BMR', 'BNC', '456.00'),
(1382, 0, 38, 'SMR90', 'SMA', '78.00'),
(1383, 0, 30, 'A7', '7mm', '9.00'),
(1384, 0, 67, 'OSPFBS', 'OSP', '10.00');");

$a = "SHOW TABLES";
$results  = $wpdb->get_results($a);

foreach($results as $index => $value) {
    foreach($value as $tableName) {
        echo $tableName . '<br />';
    }
}
*/
?>
