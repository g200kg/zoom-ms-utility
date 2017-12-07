# ZOOM MS-50G/60B/70CDR MIDI Mesasges

This is a non-official document based on a personal and non-strict experiments.


## Short messages

### Patch Select
> [0xc0,pp] : Program Change

Select a patch. pp=patch number (0-49)

###  Tuner Mode On/Off
> [0xb0,0x4a,mm] : Control Change CC#74

Tuner Mode On/Off. mm<64:off, mm>=64:on

## System Exclusives

### Identity Request
> [0xf0,0x7e,0x00,0x06,0x01,0xf7] : Identity Request

This is a MIDI Universal System Exclusive message, 'Identity Request'.
returns ID code and version number,
Bytes 10-13 represents firmware version.

MS-50G   : [0xf0,0x7e,0x00,0x06,0x02,0x52,0x58,0x00,0x00,0x00,0x33,0x2e,0x30,0x30,0xf7]
  productID = 0x58, version="3.00"  
MS-60B   : [0xf0,0x7e,0x00,0x06,0x02,0x52,0x5f,0x00,0x00,0x00,0x31,0x2e,0x30,0x30,0xf7]
  productID = 0x5f, version="1.00"  
MS-70CDR : [0xf0,0x7e,0x00,0x06,0x02,0x52,0x61,0x00,0x00,0x00,0x31,0x2e,0x30,0x30,0xf7]
  productID = 0x61, version="1.00"  

In following exclusive messages, 4th byte (0x58) is for MS-50G. it should be (0x61) or (0x5f) for MS-70CDR/MS-60B.

### Send Patch
> [0xf0,0x52,0x00,0x58,0x28,effect1,effect2,...,(effect5),(effect6), patch-name,0xf7] (50G/70CDR:146bytes, 60B:105bytes)

Write 146bytes/105bytes patch-data to current program.
It consist of effect1-6 or effect1-4 parameters and patch-name. Details are described later.

### Request Patch
> [0xf0,0x52,0x00,0x58,0x29,0xf7]

Request patch-data of current program. it returns 146/105 bytes patch-data (same as Send Patch command)

### Parameter Edit
> [0xf0,0x52,0x00,0x58,0x31,nn,pp,vvLSB,vvMSB,0xf7]

Parameter value edit. nn=effect#(0-5) pp=param#(0-10) vv=value.
It seems effective only for effect1-3  
value range is depends on each effect.  

 pp=0 : switch Effect/Bypass vv=0:off / vv=1:on.  
 pp=2 : page1-knob1  
 pp=3 : page1-knob2  
 .  
 .  
 pp=10: page3-knob3  


### Store Patch
> [0xf0,0x52,0x00,0x58,0x32,0x01,0x00,0x00,pp,0x00,0x00,0x00,0x00,0x00,0xf7]

  Force store to memory. pp is patch#(0-49). Message [Storing...] is displayed

### Request Current Program
> [0xf0,0x52,0x00,0x58,0x33,0xf7]

  Request current bank &amp; program.
  The device returns bank select and program change :  
  [0xb0,0x00,0x00, 0xb0,0x20,0x00, 0xc0,pp]  
  here the pp=program#(0-49). This is MIDI bank select and program change messages (bank = always 0) .

### Parameter Edit Enable
> [0xf0,0x52,0x00,0x58,0x50,0xf7]

  Parameter value edit enable. This is needed before Parameter Editing.

### Parameter Edit Disable
> [0xf0,0x52,0x00,0x58,0x51,0xf7]
   Parameter value edit disable.

### ??? :
> [0xf0,0x52,0x00,0x58,0x60,0xf7]

Not yet sure


## Patch Data Format

Patch-data is MIDI system exclusive data.
It starts with F0 and ends with F7

146bytes MS-50G/MS-70CDR  
105bytes MS-60B  

consist of :
>  F0 52 00 (devid) 28.. eff1 eff2,...   (eff5 eff6) patchName F7

here the devid is:  
0x58 MS-50G  
0x5F MS-60B, (eff5,eff6) is not exist  
0x61 MS-70CDR  

eff1 to eff6 include the on/off state, type of each effect, parameter values. bit arrangement is scrambled rather than fixed format.

In the following table, the notation like '1p2b3' means :  
`[Effect number(0-5)] p [Parameter number(0-8)] b [bit(0-7)]`.  
0cab ... Seems a special byte used in AMP cabinet model  
         0x00 if "OFF"  
         0x50 v1 B-AMP (SVT - MarkB)  
         0x51 v2 B-AMP (SMR - Heaven)  
         0x40 G-AMP  
         (this is depends on CAB setting, not for effect type)  

0v   ... Also a special bit for B-AMP? it is ON if the effect is ver2 B-AMP  
         (this is for effect type, not for CAB setting)

Other notation means :   
0t    ... Effect1 Type Bits  
0EfOn ... Effect1 On/Off  
c0    ... Current Effect Focus 6-n => 0-5  
n0    ... Max Effect Number  
df0   ... DSP full bits  
N0-N9 ... Patch Name (max 10char)  
tt0-7 ... Tap Tempo

|Offset| Data |       |       |       |       |       |       |       | MS60B|
|:----:|:----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:----:|
|   0  | 0xF0 |       |       |       |       |       |       |       |      |
|   1  | 0x52 |       |       |       |       |       |       |       |      |
|   2  | 0x00 |       |       |       |       |       |       |       |      |
|   3  | 0x58 |       |       |       |       |       |       |       |0x5f (id byte) |
|   4  | 0x28 |       |       |       |       |       |       |       |
|      |   b7 |   b6  |   b5  |   b4  |   b3  |   b2  |   b1  |   b0  |
|   5  |   0  |  0t   |       |       | 0p0b2 | 0p0b10| 0p1b5 | 0p2b0 |
|   6  |   0  |  0t   |  0t   |  0t   |  0t   |  0t   |   0t  | 0EfOn |
|   7  |   0  |       |       |       |       |  0t   |   0t  |  0t   |
|   8  |   0  |       |  0v   |       |       |       |       |       |
|   9  |   0  | 0p0b1 | 0p0b0 | 0t    |   0t  |   0t  |   0t  |   0t  |
|  10  |   0  | 0p0b9 | 0p0b8 | 0p0b7 | 0p0b6 | 0p0b5 | 0p0b4 | 0p0b3 |
|  11  |   0  | 0p1b4 | 0p1b3 | 0p1b2 | 0p1b1 | 0p1b0 |       | 0p0b11|
|  12  |   0  |       |       | 0p1b10| 0p1b9 | 0p1b8 | 0p1b7 | 0p1b6 |
|  13  |   0  | 0p2b8 | 0p3b3 | 0p4b3 | 0p5b3 | 0p6b3 | 0p7b3 |       |
|  14  |   0  | 0p2b7 | 0p2b6 | 0p2b5 | 0p2b4 | 0p2b3 | 0p2b2 | 0p2b1 |
|  15  |   0  | 0p3b2 | 0p3b1 | 0p3b0 |       |       | 0p2b10| 0p2b9 |
|  16  |   0  | 0p4b2 | 0p4b1 | 0p4b0 | 0p3b7 | 0p3b6 | 0p3b5 | 0p3b4 |
|  17  |   0  | 0p5b2 | 0p5b1 | 0p5b0 | 0p4b7 | 0p4b6 | 0p4b5 | 0p4b4 |
|  18  |   0  | 0p6b2 | 0p6b1 | 0p6b0 | 0p5b7 | 0p5b6 | 0p5b5 | 0p5b4 |
|  19  |   0  | 0p7b2 | 0p7b1 | 0p7b0 | 0p6b7 | 0p6b6 | 0p6b5 | 0p6b4 |
|  20  |   0  |       |       | 0p7b8 | 0p7b7 | 0p7b6 | 0p7b5 | 0p7b4 |
|  21  |   0  |       |       | 0p8b7 |       |   1t  |       |       |
|  22  |   0  |       |       |       |       |       |       |       |
|  23  | 0cab |
|  24  |   0  | 0p8b6 | 0p8b5 | 0p8b4 | 0p8b3 | 0p8b2 | 0p8b1 | 0p8b0 |
|  25  |   0  |       |       |       |       |       |       |       |
|  26  |   0  |  1t   |  1t   |  1t   |  1t   |  1t   |  1t   | 1EfOn |
|  27  |   0  |       |       |       |       |  1t   |  1t   |  1t   |
|  28  |   0  |       |  1v   |       |       |       |       |       |
|  29  |   0  | 1p0b2 | 1p0b10| 1p1b5 | 1p2b0 | 1p2b8 | 1p3b3 | 1p4b3 |
|  30  |   0  | 1p0b1 | 1p0b0 |  1t   |  1t   |  1t   |  1t   |  1t   |
|  31  |   0  | 1p0b9 | 1p0b8 | 1p0b7 | 1p0b6 | 1p0b5 | 1p0b4 | 1p0b3 |
|  32  |   0  | 1p1b4 | 1p1b3 | 1p1b2 | 1p1b1 | 1p1b0 |       | 1p0b11|
|  33  |   0  |       |       | 1p1b10| 1p1b9 | 1p1b8 | 1p1b7 | 1p1b6 |
|  34  |   0  | 1p2b7 | 1p2b6 | 1p2b5 | 1p2b4 | 1p2b3 | 1p2b2 | 1p2b1 |
|  35  |   0  | 1p3b2 | 1p3b1 | 1p3b0 |       |       | 1p2b10| 1p2b9 |
|  36  |   0  | 1p4b2 | 1p4b1 | 1p4b0 | 1p3b7 | 1p3b6 | 1p3b5 | 1p3b4 |
|  37  |   0  | 1p5b3 | 1p6b3 | 1p7b3 |       |       |       | 1p8b7 |
|  38  |   0  | 1p5b2 | 1p5b1 | 1p5b0 | 1p4b7 | 1p4b6 | 1p4b5 | 1p4b4 |
|  39  |   0  | 1p6b2 | 1p6b1 | 1p6b0 |       | 1p5b6 | 1p5b5 | 1p5b4 |
|  40  |   0  | 1p7b2 | 1p7b1 | 1p7b0 | 1p6b7 | 1p6b6 | 1p6b5 | 1p6b4 |
|  41  |   0  |       |       | 1p7b8 | 1p7b7 | 1p7b6 | 1p7b5 | 1p7b4 |
|  42  |   0  |       |       |       |       |       |       |       |
|  44  |   0  | 1p8b6 | 1p8b5 | 1p8b4 | 1p8b3 | 1p8b2 | 1p8b1 | 1p8b0 |
|  43  | 1cab |
|  45  |   0  |       |  2t   |       |       | 2p0b2 | 2p010 | 2p1b5 |
|  46  |   0  |       |       |       |       |       |       |       |
|  47  |   0  |       |  2t   |  2t   |  2t   |  2t   |  2t   | 2EfOn |
|  48  |   0  |       |       |       |       |  2t   |  2t   |  2t   |
|  49  |   0  |       |  2v   |       |       |       |       |       |
|  50  |   0  | 2p0b1 | 2p0b0 |  2t   |  2t   |  2t   |  2t   |  2t   |
|  51  |   0  | 2p0b9 | 2p0b8 | 2p0b7 | 2p0b6 | 2p0b5 | 2p0b4 | 2p0b3 |
|  52  |   0  | 2p1b4 | 2p1b3 | 2p1b2 | 2p1b1 | 2p1b0 |       | 2p0b11|
|  54  |   0  |       |       | 2p1b10| 2p1b9 | 2p1b8 | 2p1b7 | 2p1b6 |
|  53  |   0  | 2p2b0 | 2p2b8 | 2p3b3 | 2p4b3 | 2p5b3 | 2p6b3 | 2p7b3 |
|  55  |   0  | 2p2b7 | 2p2b6 | 2p2b5 | 2p2b4 | 2p2b3 | 2p2b2 | 2p2b1 |
|  56  |   0  | 2p3b2 | 2p3b1 | 2p3b0 |       |       | 2p2b10| 2p2b9 |
|  57  |   0  | 2p4b2 | 2p4b1 | 2p4b0 | 2p3b7 | 2p3b6 | 2p3b5 | 2p3b4 |
|  58  |   0  | 2p5b2 | 2p5b1 | 2p5b0 | 2p4b7 | 2p4b6 | 2p4b5 | 2p4b4 |
|  59  |   0  | 2p6b2 | 2p6b1 | 2p6b0 | 2p5b7 | 2p5b6 | 2p5b5 | 2p5b4 |
|  60  |   0  | 2p7b2 | 2p7b1 | 2p7b0 | 2p6b7 | 2p6b6 | 2p6b5 | 2p6b4 |
|  61  |   0  |       |       |  3t   | 2p8b7 |       |       |       |
|  62  |   0  |       |       | 2p7b8 | 2p7b7 | 2p7b6 | 2p7b5 | 2p7b4 |
|  63  |   0  |       |       |       |       |       |       |       |
|  64  | 2cab |
|  65  |   0  | 2p8b6 | 2p8b5 | 2p8b4 | 2p8b3 | 2p8b2 | 2p8b1 | 2p8b0 |
|  67  |   0  |  3t   |  3t   |  3t   |  3t   |  3t   |  3t   | 3EfOn |
|  66  |   0  |       |       |       |       |       |       |       |
|  68  |   0  |       |       |       |       |  3t   |  3t   |  3t   |
|  69  |   0  |       | 3p0b2 | 3p0b10| 3p1b5 | 3p2b0 | 3p2b8 | 3p3b3 |
|  70  |   0  |       |  3v   |       |       |       |       |       |
|  71  |   0  | 3p0b1 | 3p0b0 |  3t   |  3t   |  3t   |  3t   |  3t   |
|  72  |   0  | 3p0b9 | 3p0b8 | 3p0b7 | 3p0b6 | 3p0b5 | 3p0b4 | 3p0b3 |
|  73  |   0  | 3p1b4 | 3p1b3 | 3p1b2 | 3p1b1 | 3p1b0 |       | 3p0b11|
|  74  |   0  |       |       | 3p1b10| 3p1b9 | 3p1b8 | 3p1b7 | 3p1b6 |
|  75  |   0  | 3p2b7 | 3p2b6 | 3p2b5 | 3p2b4 | 3p2b3 | 3p2b2 | 3p2b1 |
|  76  |   0  | 3p3b2 | 3p3b1 | 3p3b0 |       |       | 3p2b10| 3p2b9 |
|  77  |   0  | 3p4b3 | 3p5b3 | 3p6b3 | 3p7b3 |       |       |       |
|  78  |   0  | 3p4b2 | 3p4b1 | 3p4b0 | 3p3b7 | 3p3b6 | 3p3b5 | 3p3b4 |
|  79  |   0  | 3p5b2 | 3p5b1 | 3p5b0 | 3p4b7 | 3p4b6 | 3p4b5 | 3p4b4 |
|  80  |   0  | 3p6b2 | 3p6b1 | 3p6b0 | 3p5b7 | 3p5b6 | 3p5b5 | 3p5b4 |
|  81  |   0  | 3p7b2 | 3p7b1 | 3p7b0 | 3p6b7 | 3p6b6 | 3p6b5 | 3p6b4 |
|  82  |   0  |       |       | 3p7b8 | 3p7b7 | 3p7b6 | 3p7b5 | 3p7b4 |
|  83  |   0  |       |       |       |       |       |       |       |
|  84  | 3cab |
|  85  |   0  | 3p8b7 |  4t   |       |       |       | 4p0b2 | 4p0b10| 0,x,x,x,c1,x,x,x         |
|  86  |   0  | 3p8b6 | 3p8b5 | 3p8b4 | 3p8b3 | 3p8b2 | 3p8b1 | 3p8b0 |                          |
|  87  |   0  |       |       |       |       |       |       |       |                          |
|  88  |   0  |  4t   |  4t   |  4t   |  4t   |  4t   |  4t   | 4EfOn | 0,c0,x,x,,df3,df2,df1,df0|
|  89  |   0  |       |       |       |       |  4t   |  4t   |  4t   | 0,x,x,n2,n1,n0,x,x       |
|  90  |   0  |       |       |       |       |       |       |       |                          |
|  91  |   0  | 4p0b1 | 4p0b0 |  4t   |  4t   |  4t   |  4t   |  4t   |  N0                      |
|  92  |   0  | 4p0b9 | 4p0b8 | 4p0b7 | 4p0b6 | 4p0b5 | 4p0b4 | 4p0b3 |  N1                      |
|  93  |   0  | 4p1b5 | 4p2b0 | 4p2b8 | 4p3b3 | 4p4b3 | 4p5b3 | 4p6b3 |  0x00                    |
|  94  |   0  | 4p1b4 | 4p1b3 | 4p1b2 | 4p1b1 | 4p1b0 |       | 4p0b11|  N2                      |
|  95  |   0  |       |       | 4p1b10| 4p1b9 | 4p1b8 | 4p1b7 | 4p1b6 |  N3                      |
|  96  |   0  | 4p2b7 | 4p2b6 | 4p2b5 | 4p2b4 | 4p2b3 | 4p2b2 | 4p2b1 |  N4                      |
|  97  |   0  | 4p3b2 | 4p3b1 | 4p3b0 |       |       | 4p2b10| 4p2b9 |  N5                      |
|  98  |   0  | 4p4b2 | 4p4b1 | 4p4b0 | 4p3b7 | 4p3b6 | 4p3b5 | 4p3b4 |  N6                      |
|  99  |   0  | 4p5b2 | 4p5b1 | 4p5b0 | 4p4b7 | 4p4b6 | 4p4b5 | 4p4b4 |  N7                      |
| 100  |   0  | 4p6b2 | 4p6b1 | 4p6b0 | 4p5b7 | 4p5b6 | 4p5b5 | 4p5b4 |  N8                      |
| 101  |   0  | 4p7b3 |       |       |       | 4p8b7 |       |  5t   |  0x00                    |
| 102  |   0  | 4p7b2 | 4p7b1 | 4p7b0 | 4p6b7 | 4p6b6 | 4p6b5 | 4p6b4 |  N9                      |
| 103  |   0  |       |       | 4p7b8 | 4p7b7 | 4p7b6 | 4p7b5 | 4p7b4 |  0x00                    |
| 104  |   0  |       |       |       |       |       |       |       |  0xF7                    |
| 105  | 4cab |
| 106  |   0  | 4p8b6 | 4p8b5 | 4p8b4 | 4p8b3 | 4p8b2 | 4p8b1 | 4p8b0 |
| 107  |   0  |       |       |       |       |       |       |       |
| 108  |   0  |  5t   |  5t   |  5t   |  5t   |  5t   |  5t   | 5EfOn |
| 109  |   0  |       |       | 5p0b2 | 5p0b10| 5p1b5 | 5p2b0 | 5p2b8 |
| 110  |   0  |       |       |       |       |  5t   |  5t   |  5t   |
| 111  |   0  |       |       |       |       |       |       |       |
| 112  |   0  | 5p0b1 | 5p0b0 | 5t    | 5t    | 5t    |  5t   |  5t   |
| 113  |   0  | 5p0b9 | 5p0b8 | 5p0b7 | 5p0b6 | 5p0b5 | 5p0b4 | 5p0b3 |
| 114  |   0  | 5p1p4 | 5p1b3 | 5p1b2 | 5p1b1 | 5p1b0 |       | 5p0b11|
| 115  |   0  |       |       | 5p1b10| 5p1b9 | 5p1b8 | 5p1b7 | 5p1b6 |
| 116  |   0  | 5p2b7 | 5p2b6 | 5p2b5 | 5p2b4 | 5p2b3 | 5p2b2 | 5p2b1 |
| 117  |   0  | 5p3b3 | 5p4b3 | 5p5b3 | 5p6b3 | 5p7b3 |       |       |
| 118  |   0  | 5p3b2 | 5p3b1 | 5p3b0 |       |       | 5p2b10| 5p2b9 |
| 119  |   0  | 5p4b2 | 5p4b1 | 5p4b0 | 5p3b7 | 5p3b6 | 5p3b5 | 5p3b4 |
| 120  |   0  | 5p5b2 | 5p5b1 | 5p5b0 | 5p4b7 | 5p4b6 | 5p4b5 | 5p4b4 |
| 121  |   0  | 5p6b2 | 5p6b1 | 5p6b0 | 5p5b7 | 5p5b6 | 5p5b5 | 5p5b4 |
| 122  |   0  | 5p7b2 | 5p7b1 | 5p7b0 | 5p6b7 | 5p6b6 | 5p6b5 | 5p6b4 |
| 123  |   0  |       |       | 5p7b8 | 5p7b7 | 5p7b6 | 5p7b5 | 5p7b4 |
| 124  |   0  |       |       |       |       |       |       |       |
| 125  |   0  |       | 5p8b7 |       |  c1   | tt0   |       |       |
| 126  | 5cab |
| 127  |   0  | 5p8b6 | 5p8b5 | 5p8b4 | 5p8b3 | 5p8b2 | 5p8b1 | 5p8b0 |
| 128  |   0  |       |       |       |       |       |       |       |
| 129  |   0  |  c2   |  df5  |  df4  |  df3  |  df2  |  df1  |  df0  |
| 130  |   0  |  tt2  |  tt1  |  n2   |  n1   |  n0   |       |  c0   |
| 131  |   0  |       |       |  tt7  |  tt6  |  tt5  |  tt4  |  tt3  |
| 132  |  N0  |       |       |       |       |       |       |       |
| 133  | 0x00 |       |       |       |       |       |       |       |
| 134  |  N1  |       |       |       |       |       |       |       |
| 135  |  N2  |       |       |       |       |       |       |       |
| 136  |  N3  |       |       |       |       |       |       |       |
| 137  |  N4  |       |       |       |       |       |       |       |
| 138  |  N5  |       |       |       |       |       |       |       |
| 139  |  N6  |       |       |       |       |       |       |       |
| 140  |  N7  |       |       |       |       |       |       |       |
| 141  | 0x00 |       |       |       |       |       |       |       |
| 142  |  N8  |       |       |       |       |       |       |       |
| 143  |  N9  |       |       |       |       |       |       |       |
| 144  | 0x00 |       |       |       |       |       |       |       |
| 145  | 0xF7 |       |       |       |       |       |       |       |
