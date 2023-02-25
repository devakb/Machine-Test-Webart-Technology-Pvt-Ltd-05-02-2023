@extends('layouts.app')

@section('styles')
<style>
    .regd-form {
        height: 100vh;
        width: 100%;
    }
</style>
@endsection
@section('content')

<div class="container my-5">
    <div class="row justify-content-center regd-form align-items-center">
        <div class="col-md-6">
            <div class="login-form">
                <h3 class="fw-normal">Register Your Child</h3>

                <form autocomplete="off" class="mb-5" id="registerForm">
                    <div class="mb-4">
                        <h5 class="text-uppercase"> Child Details</h5>
                        <p class="caption">Please provide the details of the child.</p>
                    </div>


                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label class="required" for="child_name">Child Name</label>
                            <input type="text" class="form-control only-alpha-input single-space-only" name="child_name" id="child_name" maxlength="80" required >
                        </div>
                        <div class="col-md-6 form-group">
                            <label class="required" for="child_name">Date of Birth</label>
                            <input type="text" class="form-control date" name="dob" id="dob" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="required" for="class">Class</label>
                        <select class="form-control select2" name="class" id="class" required>
                            <option value="" selected disabled>Choose Class</option>
                            @foreach($classes as $class)
                            <option value="{{$class}}">{{$class}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="required" for="address">Address</label>
                        <textarea class="form-control single-space-only" name="address" id="address" rows="3" required></textarea>
                    </div>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label class="required" for="country">County</label>
                            <select class="form-control select2" name="country" id="country" required>
                                <option value="" selected disabled>Choose Country</option>
                            </select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label class="required" for="state">State</label>
                            <select class="form-control select2" name="state" id="state" required>
                                <option value="" selected disabled>Choose State</option>
                            </select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label class="required" for="city">City</label>
                            <input type="text" class="form-control only-alpha-input single-space-only" name="city" id="city" maxlength="100" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label class="required" for="zipcode">Zipcode</label>
                            <input type="text" class="form-control only-number-input no-space" name="zipcode" id="zipcode" maxlength="7" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="required" for="photo">Photo</label>
                        <input type="file" class="form-control" name="photo" id="photo" required accept="image/jpeg, image/png">
                        <label class="caption">(JPG, JPEG or PNG with dimension minimum 100x100 PX and size maximum 1 MB)</label>
                    </div>

                    <div class="my-5">
                        <h5 class="text-uppercase"> Picked-up Person Details</h5>
                        <p class="caption">You can add upto 6 persons who will pick up your child. Please provide the details of the person who will be picking up your child.</p>
                    </div>

                    <div id="pickup">
                        <div class="items">
                            <div class="item">

                            </div>
                        </div>
                        <div class="float-end">
                            <button type="button" class="btn btn-primary btn-sm" onclick="addPickupPerson()">+
                                Add More Person</button>
                        </div>
                    </div>


                    <br><br>

                    <button type="submit" id="submitform" class="btn btn-primary px-4">Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>


@endsection

@section('scripts')
<script src="{{ asset("js/views/register.js") }}"></script>
@endsection
