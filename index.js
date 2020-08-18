import {fromEvent, interval} from 'rxjs'
import {scan, startWith, switchMapTo, takeUntil} from 'rxjs/operators'

const log = console.log

// startStream:       ----s----s-s----->
const startStream = fromEvent(document.querySelector('#start'), 'click')
// stopStream:       -------x--x---x-->
const stopStream = fromEvent(document.querySelector('#stop'), 'click')

// intervalStream:        ---0----1---2---->
const intervalStream = interval(1000)

// intervalStream:        ---0----1---2---->
// stopStream:            --------x-------->
// takeUntil(stopStream):
// stopIntervalStream   : ---0----1-------->
const stopIntervalStream = intervalStream.pipe(takeUntil(stopStream))

// startStream:                     ----s-------s---->
// switchMapTo(stopIntervalStream): ----01234---567-->
// startWith(0):                    0---01234---567-->
// scan(n => n + 1),                0---12345---678-->
startStream
  .pipe(
    switchMapTo(stopIntervalStream),
    startWith(0),
    scan(n => n + 1),
  )
  .subscribe(n => log(n))
