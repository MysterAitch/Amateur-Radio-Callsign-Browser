﻿const forbiddenSuffixes = [
    'ADS',
    'AID',
    'ASS',
    'AUT',
    'BIG',
    'BIT',
    'BOG',
    'BOL',
    'BOM',
    'BUM',
    'CFM',
    'CNT',
    'COC',
    'COK',
    'COL',
    'COW',
    'CUM',
    'DIC',
    'DIE',
    'DIK',
    'DOR',
    'DSC',
    'ETA',
    'FAG',
    'FIC',
    'FOC',
    'FOF',
    'FOO',
    'FUC',
    'FUK',
    'FUX',
    'GIT',
    'GOD',
    'HCQ',
    'HIV',
    'HOA',
    'HON',
    'HOR',
    'IIR',
    'IRA',
    'IUD',
    'JDX',
    'JEW',
    'JJJ',
    'KKK',
    'KOC',
    'KOK',
    'KTS',
    'LIC',
    'LIM',
    'LOO',
    'LPC',
    'MIN',
    'MOO',
    'MSG',
    'MSI',
    'NIG',
    'NIJ',
    'NIL',
    'NIP',
    'NOB',
    'OOG',
    'PBL',
    'PIG',
    'PIM',
    'PIN',
    'PIS',
    'POK',
    'PON',
    'POO',
    'POR',
    'POT',
    'POX',
    'PSE',
    'QAA',
    'QAB',
    'QAC',
    'QAD',
    'QAE',
    'QAF',
    'QAG',
    'QAH',
    'QAI',
    'QAJ',
    'QAK',
    'QAL',
    'QAM',
    'QAN',
    'QAO',
    'QAP',
    'QAQ',
    'QAR',
    'QAS',
    'QAT',
    'QAU',
    'QAV',
    'QAW',
    'QAX',
    'QAY',
    'QAZ',
    'QBA',
    'QBB',
    'QBC',
    'QBD',
    'QBE',
    'QBF',
    'QBG',
    'QBH',
    'QBI',
    'QBJ',
    'QBK',
    'QBL',
    'QBM',
    'QBN',
    'QBO',
    'QBP',
    'QBQ',
    'QBR',
    'QBS',
    'QBT',
    'QBU',
    'QBV',
    'QBW',
    'QBX',
    'QBY',
    'QBZ',
    'QCA',
    'QCB',
    'QCC',
    'QCD',
    'QCE',
    'QCF',
    'QCG',
    'QCH',
    'QCI',
    'QCJ',
    'QCK',
    'QCL',
    'QCM',
    'QCN',
    'QCO',
    'QCP',
    'QCQ',
    'QCR',
    'QCS',
    'QCT',
    'QCU',
    'QCV',
    'QCW',
    'QCX',
    'QCY',
    'QCZ',
    'QDA',
    'QDB',
    'QDC',
    'QDD',
    'QDE',
    'QDF',
    'QDG',
    'QDH',
    'QDI',
    'QDJ',
    'QDK',
    'QDL',
    'QDM',
    'QDN',
    'QDO',
    'QDP',
    'QDQ',
    'QDR',
    'QDS',
    'QDT',
    'QDU',
    'QDV',
    'QDW',
    'QDX',
    'QDY',
    'QDZ',
    'QEA',
    'QEB',
    'QEC',
    'QED',
    'QEE',
    'QEF',
    'QEG',
    'QEH',
    'QEI',
    'QEJ',
    'QEK',
    'QEL',
    'QEM',
    'QEN',
    'QEO',
    'QEP',
    'QEQ',
    'QER',
    'QES',
    'QET',
    'QEU',
    'QEV',
    'QEW',
    'QEX',
    'QEY',
    'QEZ',
    'QFA',
    'QFB',
    'QFC',
    'QFD',
    'QFE',
    'QFF',
    'QFG',
    'QFH',
    'QFI',
    'QFJ',
    'QFK',
    'QFL',
    'QFM',
    'QFN',
    'QFO',
    'QFP',
    'QFQ',
    'QFR',
    'QFS',
    'QFT',
    'QFU',
    'QFV',
    'QFW',
    'QFX',
    'QFY',
    'QFZ',
    'QGA',
    'QGB',
    'QGC',
    'QGD',
    'QGE',
    'QGF',
    'QGG',
    'QGH',
    'QGI',
    'QGJ',
    'QGK',
    'QGL',
    'QGM',
    'QGN',
    'QGO',
    'QGP',
    'QGQ',
    'QGR',
    'QGS',
    'QGT',
    'QGU',
    'QGV',
    'QGW',
    'QGX',
    'QGY',
    'QGZ',
    'QHA',
    'QHB',
    'QHC',
    'QHD',
    'QHE',
    'QHF',
    'QHG',
    'QHH',
    'QHI',
    'QHJ',
    'QHK',
    'QHL',
    'QHM',
    'QHN',
    'QHO',
    'QHP',
    'QHQ',
    'QHR',
    'QHS',
    'QHT',
    'QHU',
    'QHV',
    'QHW',
    'QHX',
    'QHY',
    'QHZ',
    'QIA',
    'QIB',
    'QIC',
    'QID',
    'QIE',
    'QIF',
    'QIG',
    'QIH',
    'QII',
    'QIJ',
    'QIK',
    'QIL',
    'QIM',
    'QIN',
    'QIO',
    'QIP',
    'QIQ',
    'QIR',
    'QIS',
    'QIT',
    'QIU',
    'QIV',
    'QIW',
    'QIX',
    'QIY',
    'QIZ',
    'QJA',
    'QJB',
    'QJC',
    'QJD',
    'QJE',
    'QJF',
    'QJG',
    'QJH',
    'QJI',
    'QJJ',
    'QJK',
    'QJL',
    'QJM',
    'QJN',
    'QJO',
    'QJP',
    'QJQ',
    'QJR',
    'QJS',
    'QJT',
    'QJU',
    'QJV',
    'QJW',
    'QJX',
    'QJY',
    'QJZ',
    'QKA',
    'QKB',
    'QKC',
    'QKD',
    'QKE',
    'QKF',
    'QKG',
    'QKH',
    'QKI',
    'QKJ',
    'QKK',
    'QKL',
    'QKM',
    'QKN',
    'QKO',
    'QKP',
    'QKQ',
    'QKR',
    'QKS',
    'QKT',
    'QKU',
    'QKV',
    'QKW',
    'QKX',
    'QKY',
    'QKZ',
    'QLA',
    'QLB',
    'QLC',
    'QLD',
    'QLE',
    'QLF',
    'QLG',
    'QLH',
    'QLI',
    'QLJ',
    'QLK',
    'QLL',
    'QLM',
    'QLN',
    'QLO',
    'QLP',
    'QLQ',
    'QLR',
    'QLS',
    'QLT',
    'QLU',
    'QLV',
    'QLW',
    'QLX',
    'QLY',
    'QLZ',
    'QMA',
    'QMB',
    'QMC',
    'QMD',
    'QME',
    'QMF',
    'QMG',
    'QMH',
    'QMI',
    'QMJ',
    'QMK',
    'QML',
    'QMM',
    'QMN',
    'QMO',
    'QMP',
    'QMQ',
    'QMR',
    'QMS',
    'QMT',
    'QMU',
    'QMV',
    'QMW',
    'QMX',
    'QMY',
    'QMZ',
    'QNA',
    'QNB',
    'QNC',
    'QND',
    'QNE',
    'QNF',
    'QNG',
    'QNH',
    'QNI',
    'QNJ',
    'QNK',
    'QNL',
    'QNM',
    'QNN',
    'QNO',
    'QNP',
    'QNQ',
    'QNR',
    'QNS',
    'QNT',
    'QNU',
    'QNV',
    'QNW',
    'QNX',
    'QNY',
    'QNZ',
    'QOA',
    'QOB',
    'QOC',
    'QOD',
    'QOE',
    'QOF',
    'QOG',
    'QOH',
    'QOI',
    'QOJ',
    'QOK',
    'QOL',
    'QOM',
    'QON',
    'QOO',
    'QOP',
    'QOQ',
    'QOR',
    'QOS',
    'QOT',
    'QOU',
    'QOV',
    'QOW',
    'QOX',
    'QOY',
    'QOZ',
    'QPA',
    'QPB',
    'QPC',
    'QPD',
    'QPE',
    'QPF',
    'QPG',
    'QPH',
    'QPI',
    'QPJ',
    'QPK',
    'QPL',
    'QPM',
    'QPN',
    'QPO',
    'QPP',
    'QPQ',
    'QPR',
    'QPS',
    'QPT',
    'QPU',
    'QPV',
    'QPW',
    'QPX',
    'QPY',
    'QPZ',
    'QQA',
    'QQB',
    'QQC',
    'QQD',
    'QQE',
    'QQF',
    'QQG',
    'QQH',
    'QQI',
    'QQJ',
    'QQK',
    'QQL',
    'QQM',
    'QQN',
    'QQO',
    'QQP',
    'QQQ',
    'QQR',
    'QQS',
    'QQT',
    'QQU',
    'QQV',
    'QQW',
    'QQX',
    'QQY',
    'QQZ',
    'QRA',
    'QRB',
    'QRC',
    'QRD',
    'QRE',
    'QRF',
    'QRG',
    'QRH',
    'QRI',
    'QRJ',
    'QRK',
    'QRL',
    'QRM',
    'QRN',
    'QRO',
    'QRP',
    'QRQ',
    'QRR',
    'QRS',
    'QRT',
    'QRU',
    'QRV',
    'QRW',
    'QRX',
    'QRY',
    'QRZ',
    'QSA',
    'QSB',
    'QSC',
    'QSD',
    'QSE',
    'QSF',
    'QSG',
    'QSH',
    'QSI',
    'QSJ',
    'QSK',
    'QSL',
    'QSM',
    'QSN',
    'QSO',
    'QSP',
    'QSQ',
    'QSR',
    'QSS',
    'QST',
    'QSU',
    'QSV',
    'QSW',
    'QSX',
    'QSY',
    'QSZ',
    'QTA',
    'QTB',
    'QTC',
    'QTD',
    'QTE',
    'QTF',
    'QTG',
    'QTH',
    'QTI',
    'QTJ',
    'QTK',
    'QTL',
    'QTM',
    'QTN',
    'QTO',
    'QTP',
    'QTQ',
    'QTR',
    'QTS',
    'QTT',
    'QTU',
    'QTV',
    'QTW',
    'QTX',
    'QTY',
    'QTZ',
    'QUA',
    'QUB',
    'QUC',
    'QUD',
    'QUE',
    'QUF',
    'QUG',
    'QUH',
    'QUI',
    'QUJ',
    'QUK',
    'QUL',
    'QUM',
    'QUN',
    'QUO',
    'QUP',
    'QUQ',
    'QUR',
    'QUS',
    'QUT',
    'QUU',
    'QUV',
    'QUW',
    'QUX',
    'QUY',
    'QUZ',
    'QVA',
    'QVB',
    'QVC',
    'QVD',
    'QVE',
    'QVF',
    'QVG',
    'QVH',
    'QVI',
    'QVJ',
    'QVK',
    'QVL',
    'QVM',
    'QVN',
    'QVO',
    'QVP',
    'QVQ',
    'QVR',
    'QVS',
    'QVT',
    'QVU',
    'QVV',
    'QVW',
    'QVX',
    'QVY',
    'QVZ',
    'QWA',
    'QWB',
    'QWC',
    'QWD',
    'QWE',
    'QWF',
    'QWG',
    'QWH',
    'QWI',
    'QWJ',
    'QWK',
    'QWL',
    'QWM',
    'QWN',
    'QWO',
    'QWP',
    'QWQ',
    'QWR',
    'QWS',
    'QWT',
    'QWU',
    'QWV',
    'QWW',
    'QWX',
    'QWY',
    'QWZ',
    'QXA',
    'QXB',
    'QXC',
    'QXD',
    'QXE',
    'QXF',
    'QXG',
    'QXH',
    'QXI',
    'QXJ',
    'QXK',
    'QXL',
    'QXM',
    'QXN',
    'QXO',
    'QXP',
    'QXQ',
    'QXR',
    'QXS',
    'QXT',
    'QXU',
    'QXV',
    'QXW',
    'QXX',
    'QXY',
    'QXZ',
    'QYA',
    'QYB',
    'QYC',
    'QYD',
    'QYE',
    'QYF',
    'QYG',
    'QYH',
    'QYI',
    'QYJ',
    'QYK',
    'QYL',
    'QYM',
    'QYN',
    'QYO',
    'QYP',
    'QYQ',
    'QYR',
    'QYS',
    'QYT',
    'QYU',
    'QYV',
    'QYW',
    'QYX',
    'QYY',
    'QYZ',
    'QZA',
    'QZB',
    'QZC',
    'QZD',
    'QZE',
    'QZF',
    'QZG',
    'QZH',
    'QZI',
    'QZJ',
    'QZK',
    'QZL',
    'QZM',
    'QZN',
    'QZO',
    'QZP',
    'QZQ',
    'QZR',
    'QZS',
    'QZT',
    'QZU',
    'QZV',
    'QZW',
    'QZX',
    'QZY',
    'QZZ',
    'RAF',
    'RCC',
    'REF',
    'RID',
    'RIM',
    'ROD',
    'ROG',
    'RON',
    'RPT',
    'RSE',
    'SAR',
    'SEX',
    'SIC',
    'SIG',
    'SLT',
    'SOD',
    'SOI',
    'SOS',
    'SOW',
    'SVC',
    'SYS',
    'TFC',
    'TIT',
    'TOO',
    'TOS',
    'TTT',
    'TXT',
    'VDB',
    'VIL',
    'VIZ',
    'WIP',
    'WNG',
    'WNK',
    'WOG',
    'WOP',
    'WOR',
    'XSC',
    'XXX',
    'YID',
    'ZAA',
    'ZAB',
    'ZAC',
    'ZAD',
    'ZAE',
    'ZAF',
    'ZAG',
    'ZAH',
    'ZAI',
    'ZAJ',
    'ZAK',
    'ZAL',
    'ZAM',
    'ZAN',
    'ZAO',
    'ZAP',
    'ZAQ',
    'ZAR',
    'ZAS',
    'ZAT',
    'ZAU',
    'ZAV',
    'ZAW',
    'ZAX',
    'ZAY',
    'ZAZ',
    'ZBA',
    'ZBB',
    'ZBC',
    'ZBD',
    'ZBE',
    'ZBF',
    'ZBG',
    'ZBH',
    'ZBI',
    'ZBJ',
    'ZBK',
    'ZBL',
    'ZBM',
    'ZBN',
    'ZBO',
    'ZBP',
    'ZBQ',
    'ZBR',
    'ZBS',
    'ZBT',
    'ZBU',
    'ZBV',
    'ZBW',
    'ZBX',
    'ZBY',
    'ZBZ',
    'ZCA',
    'ZCB',
    'ZCC',
    'ZCD',
    'ZCE',
    'ZCF',
    'ZCG',
    'ZCH',
    'ZCI',
    'ZCJ',
    'ZCK',
    'ZCL',
    'ZCM',
    'ZCN',
    'ZCO',
    'ZCP',
    'ZCQ',
    'ZCR',
    'ZCS',
    'ZCT',
    'ZCU',
    'ZCV',
    'ZCW',
    'ZCX',
    'ZCY',
    'ZCZ',
    'ZDA',
    'ZDB',
    'ZDC',
    'ZDD',
    'ZDE',
    'ZDF',
    'ZDG',
    'ZDH',
    'ZDI',
    'ZDJ',
    'ZDK',
    'ZDL',
    'ZDM',
    'ZDN',
    'ZDO',
    'ZDP',
    'ZDQ',
    'ZDR',
    'ZDS',
    'ZDT',
    'ZDU',
    'ZDV',
    'ZDW',
    'ZDX',
    'ZDY',
    'ZDZ',
    'ZEA',
    'ZEB',
    'ZEC',
    'ZED',
    'ZEE',
    'ZEF',
    'ZEG',
    'ZEH',
    'ZEI',
    'ZEJ',
    'ZEK',
    'ZEL',
    'ZEM',
    'ZEN',
    'ZEO',
    'ZEP',
    'ZEQ',
    'ZER',
    'ZES',
    'ZET',
    'ZEU',
    'ZEV',
    'ZEW',
    'ZEX',
    'ZEY',
    'ZEZ',
    'ZFA',
    'ZFB',
    'ZFC',
    'ZFD',
    'ZFE',
    'ZFF',
    'ZFG',
    'ZFH',
    'ZFI',
    'ZFJ',
    'ZFK',
    'ZFL',
    'ZFM',
    'ZFN',
    'ZFO',
    'ZFP',
    'ZFQ',
    'ZFR',
    'ZFS',
    'ZFT',
    'ZFU',
    'ZFV',
    'ZFW',
    'ZFX',
    'ZFY',
    'ZFZ',
    'ZGA',
    'ZGB',
    'ZGC',
    'ZGD',
    'ZGE',
    'ZGF',
    'ZGG',
    'ZGH',
    'ZGI',
    'ZGJ',
    'ZGK',
    'ZGL',
    'ZGM',
    'ZGN',
    'ZGO',
    'ZGP',
    'ZGQ',
    'ZGR',
    'ZGS',
    'ZGT',
    'ZGU',
    'ZGV',
    'ZGW',
    'ZGX',
    'ZGY',
    'ZGZ',
    'ZHA',
    'ZHB',
    'ZHC',
    'ZHD',
    'ZHE',
    'ZHF',
    'ZHG',
    'ZHH',
    'ZHI',
    'ZHJ',
    'ZHK',
    'ZHL',
    'ZHM',
    'ZHN',
    'ZHO',
    'ZHP',
    'ZHQ',
    'ZHR',
    'ZHS',
    'ZHT',
    'ZHU',
    'ZHV',
    'ZHW',
    'ZHX',
    'ZHY',
    'ZHZ',
    'ZIA',
    'ZIB',
    'ZIC',
    'ZID',
    'ZIE',
    'ZIF',
    'ZIG',
    'ZIH',
    'ZII',
    'ZIJ',
    'ZIK',
    'ZIL',
    'ZIM',
    'ZIN',
    'ZIO',
    'ZIP',
    'ZIQ',
    'ZIR',
    'ZIS',
    'ZIT',
    'ZIU',
    'ZIV',
    'ZIW',
    'ZIX',
    'ZIY',
    'ZIZ',
    'ZJA',
    'ZJB',
    'ZJC',
    'ZJD',
    'ZJE',
    'ZJF',
    'ZJG',
    'ZJH',
    'ZJI',
    'ZJJ',
    'ZJK',
    'ZJL',
    'ZJM',
    'ZJN',
    'ZJO',
    'ZJP',
    'ZJQ',
    'ZJR',
    'ZJS',
    'ZJT',
    'ZJU',
    'ZJV',
    'ZJW',
    'ZJX',
    'ZJY',
    'ZJZ',
    'ZKA',
    'ZKB',
    'ZKC',
    'ZKD',
    'ZKE',
    'ZKF',
    'ZKG',
    'ZKH',
    'ZKI',
    'ZKJ',
    'ZKK',
    'ZKL',
    'ZKM',
    'ZKN',
    'ZKO',
    'ZKP',
    'ZKQ',
    'ZKR',
    'ZKS',
    'ZKT',
    'ZKU',
    'ZKV',
    'ZKW',
    'ZKX',
    'ZKY',
    'ZKZ',
    'ZLA',
    'ZLB',
    'ZLC',
    'ZLD',
    'ZLE',
    'ZLF',
    'ZLG',
    'ZLH',
    'ZLI',
    'ZLJ',
    'ZLK',
    'ZLL',
    'ZLM',
    'ZLN',
    'ZLO',
    'ZLP',
    'ZLQ',
    'ZLR',
    'ZLS',
    'ZLT',
    'ZLU',
    'ZLV',
    'ZLW',
    'ZLX',
    'ZLY',
    'ZLZ',
    'ZMA',
    'ZMB',
    'ZMC',
    'ZMD',
    'ZME',
    'ZMF',
    'ZMG',
    'ZMH',
    'ZMI',
    'ZMJ',
    'ZMK',
    'ZML',
    'ZMM',
    'ZMN',
    'ZMO',
    'ZMP',
    'ZMQ',
    'ZMR',
    'ZMS',
    'ZMT',
    'ZMU',
    'ZMV',
    'ZMW',
    'ZMX',
    'ZMY',
    'ZMZ',
    'ZNA',
    'ZNB',
    'ZNC',
    'ZND',
    'ZNE',
    'ZNF',
    'ZNG',
    'ZNH',
    'ZNI',
    'ZNJ',
    'ZNK',
    'ZNL',
    'ZNM',
    'ZNN',
    'ZNO',
    'ZNP',
    'ZNQ',
    'ZNR',
    'ZNS',
    'ZNT',
    'ZNU',
    'ZNV',
    'ZNW',
    'ZNX',
    'ZNY',
    'ZNZ',
    'ZOA',
    'ZOB',
    'ZOC',
    'ZOD',
    'ZOE',
    'ZOF',
    'ZOG',
    'ZOH',
    'ZOI',
    'ZOJ',
    'ZOK',
    'ZOL',
    'ZOM',
    'ZON',
    'ZOO',
    'ZOP',
    'ZOQ',
    'ZOR',
    'ZOS',
    'ZOT',
    'ZOU',
    'ZOV',
    'ZOW',
    'ZOX',
    'ZOY',
    'ZOZ',
    'ZPA',
    'ZPB',
    'ZPC',
    'ZPD',
    'ZPE',
    'ZPF',
    'ZPG',
    'ZPH',
    'ZPI',
    'ZPJ',
    'ZPK',
    'ZPL',
    'ZPM',
    'ZPN',
    'ZPO',
    'ZPP',
    'ZPQ',
    'ZPR',
    'ZPS',
    'ZPT',
    'ZPU',
    'ZPV',
    'ZPW',
    'ZPX',
    'ZPY',
    'ZPZ',
    'ZQA',
    'ZQB',
    'ZQC',
    'ZQD',
    'ZQE',
    'ZQF',
    'ZQG',
    'ZQH',
    'ZQI',
    'ZQJ',
    'ZQK',
    'ZQL',
    'ZQM',
    'ZQN',
    'ZQO',
    'ZQP',
    'ZQQ',
    'ZQR',
    'ZQS',
    'ZQT',
    'ZQU',
    'ZQV',
    'ZQW',
    'ZQX',
    'ZQY',
    'ZQZ',
    'ZRA',
    'ZRB',
    'ZRC',
    'ZRD',
    'ZRE',
    'ZRF',
    'ZRG',
    'ZRH',
    'ZRI',
    'ZRJ',
    'ZRK',
    'ZRL',
    'ZRM',
    'ZRN',
    'ZRO',
    'ZRP',
    'ZRQ',
    'ZRR',
    'ZRS',
    'ZRT',
    'ZRU',
    'ZRV',
    'ZRW',
    'ZRX',
    'ZRY',
    'ZRZ',
    'ZSA',
    'ZSB',
    'ZSC',
    'ZSD',
    'ZSE',
    'ZSF',
    'ZSG',
    'ZSH',
    'ZSI',
    'ZSJ',
    'ZSK',
    'ZSL',
    'ZSM',
    'ZSN',
    'ZSO',
    'ZSP',
    'ZSQ',
    'ZSR',
    'ZSS',
    'ZST',
    'ZSU',
    'ZSV',
    'ZSW',
    'ZSX',
    'ZSY',
    'ZSZ',
    'ZTA',
    'ZTB',
    'ZTC',
    'ZTD',
    'ZTE',
    'ZTF',
    'ZTG',
    'ZTH',
    'ZTI',
    'ZTJ',
    'ZTK',
    'ZTL',
    'ZTM',
    'ZTN',
    'ZTO',
    'ZTP',
    'ZTQ',
    'ZTR',
    'ZTS',
    'ZTT',
    'ZTU',
    'ZTV',
    'ZTW',
    'ZTX',
    'ZTY',
    'ZTZ',
    'ZUA',
    'ZUB',
    'ZUC',
    'ZUD',
    'ZUE',
    'ZUF',
    'ZUG',
    'ZUH',
    'ZUI',
    'ZUJ',
    'ZUK',
    'ZUL',
    'ZUM',
    'ZUN',
    'ZUO',
    'ZUP',
    'ZUQ',
    'ZUR',
    'ZUS',
    'ZUT',
    'ZUU',
    'ZUV',
    'ZUW',
    'ZUX',
    'ZUY',
    'ZUZ',
    'ZVA',
    'ZVB',
    'ZVC',
    'ZVD',
    'ZVE',
    'ZVF',
    'ZVG',
    'ZVH',
    'ZVI',
    'ZVJ',
    'ZVK',
    'ZVL',
    'ZVM',
    'ZVN',
    'ZVO',
    'ZVP',
    'ZVQ',
    'ZVR',
    'ZVS',
    'ZVT',
    'ZVU',
    'ZVV',
    'ZVW',
    'ZVX',
    'ZVY',
    'ZVZ',
    'ZWA',
    'ZWB',
    'ZWC',
    'ZWD',
    'ZWE',
    'ZWF',
    'ZWG',
    'ZWH',
    'ZWI',
    'ZWJ',
    'ZWK',
    'ZWL',
    'ZWM',
    'ZWN',
    'ZWO',
    'ZWP',
    'ZWQ',
    'ZWR',
    'ZWS',
    'ZWT',
    'ZWU',
    'ZWV',
    'ZWW',
    'ZWX',
    'ZWY',
    'ZWZ',
    'ZXA',
    'ZXB',
    'ZXC',
    'ZXD',
    'ZXE',
    'ZXF',
    'ZXG',
    'ZXH',
    'ZXI',
    'ZXJ',
    'ZXK',
    'ZXL',
    'ZXM',
    'ZXN',
    'ZXO',
    'ZXP',
    'ZXQ',
    'ZXR',
    'ZXS',
    'ZXT',
    'ZXU',
    'ZXV',
    'ZXW',
    'ZXX',
    'ZXY',
    'ZXZ',
    'ZYA',
    'ZYB',
    'ZYC',
    'ZYD',
    'ZYE',
    'ZYF',
    'ZYG',
    'ZYH',
    'ZYI',
    'ZYJ',
    'ZYK',
    'ZYL',
    'ZYM',
    'ZYN',
    'ZYO',
    'ZYP',
    'ZYQ',
    'ZYR',
    'ZYS',
    'ZYT',
    'ZYU',
    'ZYV',
    'ZYW',
    'ZYX',
    'ZYY',
    'ZYZ',
    'ZZA',
    'ZZB',
    'ZZC',
    'ZZD',
    'ZZE',
    'ZZF',
    'ZZG',
    'ZZH',
    'ZZI',
    'ZZJ',
    'ZZK',
    'ZZL',
    'ZZM',
    'ZZN',
    'ZZO',
    'ZZP',
    'ZZQ',
    'ZZR',
    'ZZS',
    'ZZT',
    'ZZU',
    'ZZV',
    'ZZW',
    'ZZX',
    'ZZY',
    'ZZZ',
];
