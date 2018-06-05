import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { NotificationsService } from 'angular2-notifications'
import { ModalDirective } from 'ngx-bootstrap/modal'
import { FormReactive, VIDEO_ABUSE_REASON, VideoAbuseService } from '../../../shared/index'
import { VideoDetails } from '../../../shared/video/video-details.model'
import { I18n } from '@ngx-translate/i18n-polyfill'
import { FormReactiveErrors, FormReactiveValidationMessages } from '@app/shared'
import { FormValidatorService } from '@app/shared/forms/form-validators/form-validator.service'

@Component({
  selector: 'my-video-report',
  templateUrl: './video-report.component.html',
  styleUrls: [ './video-report.component.scss' ]
})
export class VideoReportComponent extends FormReactive implements OnInit {
  @Input() video: VideoDetails = null

  @ViewChild('modal') modal: ModalDirective

  error: string = null

  constructor (
    protected formValidatorService: FormValidatorService,
    private videoAbuseService: VideoAbuseService,
    private notificationsService: NotificationsService,
    private i18n: I18n
  ) {
    super()
  }

  ngOnInit () {
    this.buildForm({
      reason: VIDEO_ABUSE_REASON
    })
  }

  show () {
    this.modal.show()
  }

  hide () {
    this.modal.hide()
  }

  report () {
    const reason = this.form.value['reason']

    this.videoAbuseService.reportVideo(this.video.id, reason)
                          .subscribe(
                            () => {
                              this.notificationsService.success(this.i18n('Success'), this.i18n('Video reported.'))
                              this.hide()
                            },

                            err => this.notificationsService.error(this.i18n('Error'), err.message)
                           )
  }
}
